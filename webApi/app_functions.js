const express = require("express");
const app = express();
// Third party imports
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// My imports
const dbOperations = require("./database/db_operations");
const port = process.env.PORT;
const { errorHandler } = require("./middlewares");

exports.useMiddlewaresBeforeRouters = () => {
  app.use(bodyParser.json());
  app.use(cookieParser());
};

exports.useRouters = () => {
  const routers = require("./routers/index");
  const { checkAuth, isAdmin } =
    require("./middlewares").AccountMiddleWares.auth;
  app.use("/", checkAuth, routers.MainRouter);
  app.use("/admin", checkAuth, isAdmin, routers.AdminRouter);
  app.use("/account", checkAuth, routers.AccountRouter);
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
