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
router.get(
  "/:id",
  validator.GetBlogByIdValidator,
  handleValResult,
  tryCatch(controller.GetBlogById)
);

router.post(
  "/",
  validator.CreateBlogValidator,
  handleValResult,
  tryCatch(controller.CreateBlog)
);

router.put(
  "/:id",
  validator.UpdateBlog,
  handleValResult,
  tryCatch(controller.UpdateBlog)
);

module.exports = router;
