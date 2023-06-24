const router = require("express").Router();
const { CommentController } = require("../../controllers").AdminControllers;
const { CommentValidator } = require("../../validators").AdminValidators;
const handleValResult =
  require("../../middlewares").ControllerMiddlewares.HandleValResult;

router.get("/", CommentController.GetComments);
router.get(
  "/:id",
  CommentValidator.GetCommentByIdValidator,
  handleValResult,
  CommentController.GetCommentById
);

module.exports = router;
