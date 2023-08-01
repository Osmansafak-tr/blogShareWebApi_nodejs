const router = require("express").Router();
const { tryCatch } = require("../../common").utils;
const { RoleController } = require("../../controllers").AdminControllers;
const { RoleValidator } = require("../../validators").AdminValidators;
const { handleValResult } = require("../../middlewares").ControllerMiddlewares;

router.get("/", tryCatch(RoleController.GetRoles));
router.get(
  "/:id",
  RoleValidator.GetRoleByIdValidator,
  handleValResult,
  tryCatch(RoleController.GetRoleById)
);

router.post(
  "/",
  RoleValidator.CreateRoleValidator,
  handleValResult,
  tryCatch(RoleController.CreateRole)
);

router.put(
  "/:id",
  RoleValidator.UpdateRoleValidator,
  handleValResult,
  tryCatch(RoleController.UpdateRole)
);

router.delete(
  "/:id",
  RoleValidator.DeleteRoleValidator,
  handleValResult,
  tryCatch(RoleController.DeleteRole)
);

module.exports = router;
