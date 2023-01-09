const express = require("express");
const cors = require("cors");

const calculateController = require("./controllers/calculatorController");
const errorHandler = require("./controllers/errorHandler");
const AppError = require("./utils/AppError");

const app = express();

app.use(express.json());
app.use(cors());

//serving webPage
app.use(express.static("build"));

app.post("/calculate", calculateController.calculate);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;
