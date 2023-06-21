const app = require("express")();
const { KeywordRouter } = require("./index");

app.use("/keywords",KeywordRouter);

module.exports = app;

