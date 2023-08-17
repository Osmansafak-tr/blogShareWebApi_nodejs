const router = require("express").Router();
const { isAuthenticated } =
  require("../../middlewares").AccountMiddleWares.auth;
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
router.post("/logout", isAuthenticated, tryCatch(AccountController.Logout));

router.put("/refresh", isAuthenticated, tryCatch(AccountController.Refresh));

module.exports = router;
