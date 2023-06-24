const router = require("express").Router();
const { UserController } = require("../../controllers").AdminControllers;
const { UserValidator } = require("../../validators").AdminValidators;
const handleValResult = require("../../middlewares").ControllerMiddlewares.HandleValResult;

router.get("/", UserController.GetUsers);
router.get(
  "/:id",
  UserValidator.GetUserByIdValidator,
  handleValResult,
  UserController.GetUserById
);

module.exports = router;
