const app = require("express")();
const { ProfileRouter, BlogRouter } = require("./index");

app.use("/", ProfileRouter);
app.use("/myBlogs", BlogRouter);

module.exports = app;
