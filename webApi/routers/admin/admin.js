const app = require("express")();
const { KeywordRouter, RoleRouter, UserRouter } = require("./index");

app.use("/keywords", KeywordRouter);
app.use("/roles", RoleRouter);
app.use("/users", UserRouter);

module.exports = app;
