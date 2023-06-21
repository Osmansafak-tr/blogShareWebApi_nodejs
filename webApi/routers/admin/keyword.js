const router = require("express").Router();
const { KeywordController } = require("../../controllers").AdminControllers;
const { KeywordValidator } = require("../../validators").AdminValidators;
const handleValResult = require("../../middlewares").ControllerMiddlewares.HandleValResult;

router.get("/", KeywordController.GetKeywords);
router.get(
  "/:id",
  KeywordValidator.GetKeywordByIdValidator,
  handleValResult,
  KeywordController.GetKeywordById
);

router.post(
  "/",
  KeywordValidator.CreateKeywordValidator,
  handleValResult,
  KeywordController.CreateKeyword
);

router.put(
  "/:id",
  KeywordValidator.UpdateKeywordValidator,
  handleValResult,
  KeywordController.UpdateKeyword
);

router.delete(
  "/:id",
  KeywordValidator.DeleteKeywordValidator,
  handleValResult,
  KeywordController.DeleteKeyword
);

module.exports = router;
