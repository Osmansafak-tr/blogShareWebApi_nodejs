const router = require("express").Router();
const { tryCatch } = require("../../common").utils;
const { UserController } = require("../../controllers").AdminControllers;
const { UserValidator } = require("../../validators").AdminValidators;
const { handleValResult } = require("../../middlewares").ControllerMiddlewares;

router.get("/", tryCatch(UserController.GetUsers));
router.get(
  "/:id",
  UserValidator.GetUserByIdValidator,
  handleValResult,
  tryCatch(UserController.GetUserById)
);

module.exports = router;
