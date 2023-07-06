const router = require("express").Router();
const { AccountValidator } = require("../../validators");
const { handleValResult } = require("../../middlewares").ControllerMiddlewares;
const { tryCatch } = require("../../common/utils");
const { AccountController } = require("../../controllers");

router.post(
  "/register",
  AccountValidator.RegisterValidator,
  handleValResult,
  tryCatch(AccountController.Register)
);

module.exports = router;
