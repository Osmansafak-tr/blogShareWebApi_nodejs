const app = require("express")();
const { ProfileRouter, BlogRouter } = require("./index");
const { isAuthenticated } = require("../../../middlewares").AccountMiddleWares
  .auth;

app.use("*", isAuthenticated);
app.use("/", ProfileRouter);
app.use("/myBlogs", BlogRouter);

module.exports = app;
