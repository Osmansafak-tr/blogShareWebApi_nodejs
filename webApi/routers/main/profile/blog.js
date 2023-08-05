const router = require("express").Router();
const { BlogController } =
  require("../../../controllers/main").ProfileControllers;
const controller = BlogController;
const { tryCatch } = require("../../../common").utils;

router.get("/", tryCatch(controller.GetMyBlogs));

module.exports = router;
