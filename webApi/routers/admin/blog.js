const router = require("express").Router();
const { tryCatch } = require("../../common").utils;
const { BlogController } = require("../../controllers").AdminControllers;
const { BlogValidator } = require("../../validators").AdminValidators;
const { handleValResult } = require("../../middlewares").ControllerMiddlewares;

router.get("/", tryCatch(BlogController.GetBlogs));
router.get(
  "/:id",
  BlogValidator.GetBlogByIdValidator,
  handleValResult,
  tryCatch(BlogController.GetBlogById)
);

router.post(
  "/",
  BlogValidator.CreateBlogValidator,
  handleValResult,
  tryCatch(BlogController.CreateBlog)
);

router.put(
  "/:id",
  BlogValidator.UpdateBlogValidator,
  handleValResult,
  tryCatch(BlogController.UpdateBlog)
);

router.delete(
  "/:id",
  BlogValidator.DeleteBlogValidator,
  handleValResult,
  tryCatch(BlogController.DeleteBlog)
);

module.exports = router;
