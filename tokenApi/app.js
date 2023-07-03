const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const router = require("./router/token");
app.use("/", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Listening on port " + port + "...");
});
