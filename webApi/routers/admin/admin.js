const app = require("express")();
const { KeywordRouter, RoleRouter, UserRouter, CommentRouter } = require("./index");

app.use("/keywords", KeywordRouter);
app.use("/roles", RoleRouter);
app.use("/users", UserRouter);
app.use("/comments", CommentRouter);

module.exports = app;
