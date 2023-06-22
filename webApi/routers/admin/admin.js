const app = require("express")();
const { KeywordRouter, RoleRouter } = require("./index");

app.use("/keywords", KeywordRouter);
app.use("/roles", RoleRouter);

module.exports = app;
