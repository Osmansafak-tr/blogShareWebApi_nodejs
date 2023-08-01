const app = require("express")();
const { HomeRouter, ProfileRouter } = require("./index");

app.use("/", HomeRouter);
app.use("/profile", ProfileRouter);

module.exports = app;
