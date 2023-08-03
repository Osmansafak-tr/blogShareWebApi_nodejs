const router = require("express").Router();
const { ProfileValidator } = require("../../validators").MainValidators;
const validator = ProfileValidator;
const { ProfileController } = require("../../controllers").MainControllers;
const controller = ProfileController;
const { handleValResult } = require("../../middlewares").ControllerMiddlewares;
const { tryCatch } = require("../../common").utils;

router.get("/", tryCatch(controller.GetMyProfile));
router.put(
  "/",
  validator.UpdateMyProfileValidator,
  handleValResult,
  tryCatch(controller.UpdateMyProfile)
);

module.exports = router;
