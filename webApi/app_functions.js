const express = require("express");
const app = express();
// Third party imports
const bodyParser = require("body-parser");
require("dotenv").config();
// My imports
const dbOperations = require("./database/db_operations");
const port = process.env.PORT;
const { errorHandler } = require("./middlewares");

exports.useMiddlewaresBeforeRouters = () => {
  app.use(bodyParser.json());
};

exports.useRouters = () => {
  const routers = require("./routers/index");
  app.use("/", routers.MainRouter);
  app.use("/admin", routers.AdminRouter);
};

exports.useMiddlewaresAfterRouters = () => {
  app.use(errorHandler);
};

exports.connectDbAndListen = async () => {
  await dbOperations.connect();
  await dbOperations.generateData();
  app.listen(port, () => {
    console.log("WebApi Listening On Port : ", port);
  });
};
