const router = require("express").Router();
const { MainController } = require("../controllers/index");

router.get("/",MainController.HomePageGET);

module.exports = router;