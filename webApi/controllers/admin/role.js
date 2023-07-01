const { Role } = require("../../models");
const common = require("../../common/index");
const { AppError } = common.classes;
const { ErrorConstants } = common.constants;

exports.GetRoles = async (req, res) => {
  const roles = await Role.find().select("-__v");
  return res.status(200).json(roles);
};

exports.GetRoleById = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findOne({ _id: id }).select("-__v");
  if (role == null)
    throw new AppError(ErrorConstants.DataNotFound, "Role can not found.");

  return res.status(200).json(role);
};

exports.CreateRole = async (req, res) => {
  const { name } = req.body;
  const createModel = {
    name: name,
  };

  const role = await Role.findOne({ name: name });
  if (role != null)
    throw new AppError(
      ErrorConstants.SameDataAlreadyCreated,
      "There is a role that has the same name."
    );

  await Role.create(createModel);
  return res.status(200).json("Role successfully created.");
};

exports.UpdateRole = async (req, res) => {
  const { id } = req.params;
  var { name } = req.body;

  const role = await Role.findOne({ _id: id });
  if (role == null)
    throw new AppError(ErrorConstants.DataNotFound, "Role can not found.");

  const roleWithSameName = await Role.findOne({
    _id: { $ne: id },
    name: name,
  }).select("_id");
  if (roleWithSameName != null)
    throw new AppError(
      ErrorConstants.SameDataAlreadyCreated,
      "There is a role that has the same name."
    );

  role.name = name;
  role.updatedAt = Date.now();
  await role.save();
  return res.status(200).json({ message: "Role successfully updated." });
};

exports.DeleteRole = async (req, res) => {
  const { id } = req.params;
  const deleteDoc = await Role.deleteOne({ _id: id });
  if (deleteDoc.deletedCount == 0)
    throw new AppError(ErrorConstants.DataNotFound, "Role can not found.");

  return res.status(200).json({ message: "Role successfully deleted." });
};
