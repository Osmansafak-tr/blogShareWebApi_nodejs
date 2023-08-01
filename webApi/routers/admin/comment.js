const router = require("express").Router();
const { tryCatch } = require("../../common").utils;
const { CommentController } = require("../../controllers").AdminControllers;
const { CommentValidator } = require("../../validators").AdminValidators;
const { handleValResult } = require("../../middlewares").ControllerMiddlewares;

router.get("/", tryCatch(CommentController.GetComments));
router.get(
  "/:id",
  CommentValidator.GetCommentByIdValidator,
  handleValResult,
  tryCatch(CommentController.GetCommentById)
);

module.exports = router;
