const router = require("express").Router();
const { HomeController } = require("../../controllers").MainControllers;

router.get("/",HomeController.HomePageGET);

module.exports = router;