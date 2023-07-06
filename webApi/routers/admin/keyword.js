const router = require("express").Router();
const { tryCatch } = require("../../common").utils;
const { KeywordController } = require("../../controllers").AdminControllers;
const { KeywordValidator } = require("../../validators").AdminValidators;
const { handleValResult } = require("../../middlewares").ControllerMiddlewares;

router.get("/", tryCatch(KeywordController.GetKeywords));
router.get(
  "/:id",
  KeywordValidator.GetKeywordByIdValidator,
  handleValResult,
  tryCatch(KeywordController.GetKeywordById)
);

router.post(
  "/",
  KeywordValidator.CreateKeywordValidator,
  handleValResult,
  tryCatch(KeywordController.CreateKeyword)
);

router.put(
  "/:id",
  KeywordValidator.UpdateKeywordValidator,
  handleValResult,
  tryCatch(KeywordController.UpdateKeyword)
);

router.delete(
  "/:id",
  KeywordValidator.DeleteKeywordValidator,
  handleValResult,
  tryCatch(KeywordController.DeleteKeyword)
);

module.exports = router;
