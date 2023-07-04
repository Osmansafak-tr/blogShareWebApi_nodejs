const express = require("express");
const app = express();

require("dotenv").config();

const db_operations = require("./database/db_operations");
const port = process.env.PORT;

app.use(express.json());

const router = require("./router/token");
app.use("/", router);

app.listen(port, async () => {
  await db_operations.connect();
  console.log("Listening on port " + port + "...");
});
