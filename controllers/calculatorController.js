const AppCalculator = require("../utils/AppCalculator");
const AppError = require("../utils/AppError");

exports.calculate = (req, res, next) => {
  if (!req.body.operation)
    return next(new AppError("Please provide an operation to solve", 400));

  const operation = new AppCalculator(String(req.body.operation));

  if (!operation.checkIfValid())
    return next(new AppError("Please provide correct operation", 400));

  const result = operation.getResult();

  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
};
