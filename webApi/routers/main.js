const router = require("express").Router();
const { MainController } = require("../controllers/index");

router.use("/",MainController.HomePageGET);

module.exports = router;