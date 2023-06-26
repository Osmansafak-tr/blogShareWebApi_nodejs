const router = require("express").Router();
const { BlogController } = require("../../controllers").AdminControllers;
const { BlogValidator } = require("../../validators").AdminValidators;
const handleValResult =
  require("../../middlewares").ControllerMiddlewares.HandleValResult;

router.get("/", BlogController.GetBlogs);
router.get(
  "/:id",
  BlogValidator.GetBlogByIdValidator,
  handleValResult,
  BlogController.GetBlogById
);

router.post(
  "/",
  BlogValidator.CreateBlogValidator,
  handleValResult,
  BlogController.CreateBlog
);

router.put(
  "/:id",
  BlogValidator.UpdateBlogValidator,
  handleValResult,
  BlogController.UpdateBlog
);

router.delete(
  "/:id",
  BlogValidator.DeleteBlogValidator,
  handleValResult,
  BlogController.DeleteBlog
);

module.exports = router;
