const router = require("express").Router();
const { RoleController } = require("../../controllers").AdminControllers;
const { RoleValidator } = require("../../validators").AdminValidators;
const handleValResult = require("../../middlewares").ControllerMiddlewares.HandleValResult;

router.get("/", RoleController.GetRoles);
router.get(
  "/:id",
  RoleValidator.GetRoleByIdValidator,
  handleValResult,
  RoleController.GetRoleById
);

router.post(
  "/",
  RoleValidator.CreateRoleValidator,
  handleValResult,
  RoleController.CreateRole
);

router.put(
  "/:id",
  RoleValidator.UpdateRoleValidator,
  handleValResult,
  RoleController.UpdateRole
);

router.delete(
  "/:id",
  RoleValidator.DeleteRoleValidator,
  handleValResult,
  RoleController.DeleteRole
);

module.exports = router;
