const express = require("express");
const app = express();
// Other Imports
require("dotenv").config();
const bodyParser = require("body-parser");
// Env Imports
const port = process.env.PORT;

app.use(bodyParser.json());

const routers = require("./routers/index");
app.use("/",routers.MainRouter);

app.listen(port, () => {
    console.log("WebApi Listening On Port : ",port);
});
