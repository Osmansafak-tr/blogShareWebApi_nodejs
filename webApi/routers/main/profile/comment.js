const router = require("express").Router();
// Validator and controller import
const { BlogValidator } = require("../../../validators/main").ProfileValidators;
const validator = BlogValidator;
const { CommentController } =
  require("../../../controllers/main").ProfileControllers;
const controller = CommentController;
// Other function imports
const { tryCatch } = require("../../../common").utils;
const { handleValResult } =
  require("../../../middlewares").ControllerMiddlewares;

// Router definitions
router.get("/", tryCatch(controller.GetMyComments));

module.exports = router;
