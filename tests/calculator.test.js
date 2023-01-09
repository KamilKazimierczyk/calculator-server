const request = require("supertest");
const app = require("../app");

describe("POST /calculate", () => {
  test("Server should return the result of the query, status code 200 and status set to success if the query is correct", async () => {
    const testData = [
      {
        result: 2,
        body: {
          operation: "1+1",
        },
      },
      {
        result: 4,
        body: {
          operation: "2*2",
        },
      },
      {
        result: 1,
        body: {
          operation: "2/2",
        },
      },
      {
        result: 0,
        body: {
          operation: "2-2",
        },
      },
      {
        result: 4,
        body: {
          operation: "2^2",
        },
      },
      {
        result: 2,
        body: {
          operation: "4v2",
        },
      },
      {
        result: 6,
        body: {
          operation: "2+2*2",
        },
      },
      {
        result: 6,
        body: {
          operation: "2+4v2*2",
        },
      },
      {
        result: 6,
        body: {
          operation: "2+2*(4-2)",
        },
      },
      {
        result: 34,
        body: {
          operation: "2+2*(4*(2+2))",
        },
      },
    ];
    for (const test of testData) {
      const testRes = await request(app).post("/calculate").send(test.body);

      expect(testRes.statusCode).toEqual(200);
      expect(testRes.body.status).toEqual("success");
      expect(testRes.body.data.result).toEqual(test.result);
    }
  });

  test("Server should return error with status code 400 and status set to fail if the query is not set", async () => {
    const testRes = await request(app).post("/calculate");

    expect(testRes.statusCode).toEqual(400);
    expect(testRes.body.status).toEqual("fail");
    expect(testRes.body.message).toEqual(
      "Please provide an operation to solve"
    );
  });

  test("Server should return error with status code 400 and status set to fail if the query is incorrect", async () => {
    const testData = [
      {
        operation: "1+",
      },
      {
        operation: "abc(2,2)",
      },
      {
        operation: "pow(2,2)",
      },
      {
        operation: "2**2",
      },
    ];
    for (const test of testData) {
      const testRes = await request(app).post("/calculate").send(test);

      expect(testRes.statusCode).toEqual(400);
      expect(testRes.body.status).toEqual("fail");
      expect(testRes.body.message).toEqual("Please provide correct operation");
    }
  });
});
