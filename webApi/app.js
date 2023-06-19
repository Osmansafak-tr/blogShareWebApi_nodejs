const express = require("express");
const app = express();
// Other Imports
require("dotenv").config();
const bodyParser = require("body-parser");
// Env Imports
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log("WebApi Listening On Port : ",port);
});
