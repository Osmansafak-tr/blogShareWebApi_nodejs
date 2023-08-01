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
router.post(
  "/login",
  AccountValidator.LoginValidator,
  handleValResult,
  tryCatch(AccountController.Login)
);
router.post("/logout", tryCatch(AccountController.Logout));

router.put("/refresh", tryCatch(AccountController.Refresh));

module.exports = router;
