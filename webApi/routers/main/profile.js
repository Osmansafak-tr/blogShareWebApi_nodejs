const router = require("express").Router();
const { ProfileController } = require("../../controllers").MainControllers;
const controller = ProfileController;
const { tryCatch } = require("../../common").utils;

router.get("/", tryCatch(controller.GetMyProfile));

module.exports = router;
