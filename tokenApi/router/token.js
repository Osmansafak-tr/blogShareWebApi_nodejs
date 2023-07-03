const router = require("express").Router();
const validator = require("../validator/token");
const { handleValResult } = require("../middlewares/index");
const controller = require("../controller/token");

router.post(
  "/connect/token",
  validator.CreateTokensValidator,
  handleValResult,
  controller.CreateTokens
);

module.exports = router;
