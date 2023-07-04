const router = require("express").Router();
const validator = require("../validator/token");
const { handleValResult } = require("../middlewares/index");
const { tryCatch } = require("../utils");
const controller = require("../controller/token");

router.post(
  "/connect/token",
  validator.CreateTokensValidator,
  handleValResult,
  tryCatch(controller.CreateTokens)
);
router.post(
  "/refreshToken",
  validator.RefreshTokenValidator,
  handleValResult,
  tryCatch(controller.RefreshToken)
);

module.exports = router;
