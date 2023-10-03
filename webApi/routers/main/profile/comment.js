const router = require("express").Router();
// Validator and controller import
const { CommentValidator } =
  require("../../../validators/main").ProfileValidators;
const { CommentController } =
  require("../../../controllers/main").ProfileControllers;
const validator = CommentValidator;
const controller = CommentController;
// Other function imports
const { tryCatch } = require("../../../common").utils;
const { handleValResult } =
  require("../../../middlewares").ControllerMiddlewares;

// Router definitions
router.get("/", tryCatch(controller.GetMyComments));
router.get(
  "/:id",
  validator.GetCommentByIdValidator,
  handleValResult,
  tryCatch(controller.GetCommentById)
);

module.exports = router;
