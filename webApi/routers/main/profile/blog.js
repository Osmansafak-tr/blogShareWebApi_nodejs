const router = require("express").Router();
// Validator and controller import
const { BlogValidator } = require("../../../validators/main").ProfileValidators;
const validator = BlogValidator;
const { BlogController } =
  require("../../../controllers/main").ProfileControllers;
const controller = BlogController;
// Other function imports
const { tryCatch } = require("../../../common").utils;
const { handleValResult } =
  require("../../../middlewares").ControllerMiddlewares;

// Router definitions
router.get("/", tryCatch(controller.GetMyBlogs));

router.post(
  "/",
  validator.CreateBlogValidator,
  handleValResult,
  tryCatch(controller.CreateBlog)
);

module.exports = router;
