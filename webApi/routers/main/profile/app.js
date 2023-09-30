const app = require("express")();
const routers = require("./index");
const { isAuthenticated } = require("../../../middlewares").AccountMiddleWares
  .auth;

app.use("*", isAuthenticated);
app.use("/", routers.ProfileRouter);
app.use("/myBlogs", routers.BlogRouter);
app.use("/myComments", routers.CommentRouter);

module.exports = app;
