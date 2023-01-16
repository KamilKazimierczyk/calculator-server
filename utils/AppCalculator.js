const MathOperations = require("./MathOperations");

class AppCalculator {
  signRegExp = /[\+\^v\-\*/]/g;
  queryRegExp = /([-+]?[0-9]*\.?[0-9]+[\+\^v\-\*/])+([-+]?[0-9]*\.?[0-9]+)/g;
  functionsNames = ["^", "v"];
  primaryNames = ["*", "/"];
  secondaryNames = ["+", "-"];

  constructor(mathQuery) {
    this.mathQuery = mathQuery.trim();
  }

  checkIfValid() {
    return this.mathQuery.match(this.queryRegExp);
  }

  solveQuery(query = this.mathQuery) {
    let queryToSolve = query;

    if (queryToSolve.includes("("))
      queryToSolve = this.solveBrackets(queryToSolve);

    [this.functionsNames, this.primaryNames, this.secondaryNames].forEach(
      (operations) => {
        while (
          (queryToSolve.includes(operations[0]) ||
            queryToSolve.includes(operations[1])) &&
          queryToSolve.match(this.queryRegExp)
        ) {
          let index, sign;

          if (
            (queryToSolve.indexOf(operations[0]) <
              queryToSolve.indexOf(operations[1]) &&
              queryToSolve.indexOf(operations[0]) >= 0) ||
            queryToSolve.indexOf(operations[1]) === -1
          ) {
            index = queryToSolve.indexOf(operations[0]);
            sign = operations[0];
          } else {
            index = queryToSolve.indexOf(operations[1]);
            sign = operations[1];
          }

          const leftFromTheSign = queryToSolve.split(sign)[0];
          const signsOnLeft = leftFromTheSign.match(this.signRegExp);

          const firstNumber = signsOnLeft?.length
            ? parseFloat(
                leftFromTheSign.slice(
                  leftFromTheSign.lastIndexOf(
                    signsOnLeft[signsOnLeft.length - 1]
                  )
                )
              )
            : parseFloat(queryToSolve.split(sign)[0]);
          const secondNumber = parseFloat(queryToSolve.split(sign)[1]);

          const result = this.calculate(
            parseFloat(firstNumber),
            parseFloat(secondNumber),
            sign
          );

          queryToSolve = queryToSolve.replace(
            `${firstNumber}${sign}${secondNumber}`,
            result
          );
        }
      }
    );

    return queryToSolve;
  }

  solveBrackets(query) {
    let solvedQuery = query;
    while (solvedQuery.includes("(")) {
      let startIndexOfBrackets = solvedQuery.indexOf("(");
      while (solvedQuery.slice(startIndexOfBrackets + 1).includes("(")) {
        startIndexOfBrackets = solvedQuery.indexOf(
          "(",
          startIndexOfBrackets + 1
        );
      }

      const endIndexOfBrackets = solvedQuery.indexOf(")", startIndexOfBrackets);
      const queryToSolve = solvedQuery.slice(
        startIndexOfBrackets + 1,
        endIndexOfBrackets
      );

      const result = this.solveQuery(queryToSolve);

      solvedQuery = solvedQuery.replace(`(${queryToSolve})`, result);
    }

    return solvedQuery;
  }

  calculate(x, y, sign) {
    switch (sign) {
      case "+":
        return MathOperations.add(x, y);
      case "-":
        return MathOperations.odd(x, y);
      case "*":
        return MathOperations.multiply(x, y);
      case "/":
        return MathOperations.divide(x, y);
      case "^":
        return MathOperations.pow(x, y);
      case "v":
        return MathOperations.root(x, y);
    }
  }

  getResult = () => parseFloat(this.solveQuery());
}

module.exports = AppCalculator;
