const { Role } = require("../../models");

exports.GetRoles = async (req, res) => {
  try {
    const roles = await Role.find().select("-_id -__v");
    return res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.GetRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findOne({ _id: id }).select("-_id -__v");
    if (role == null) return res.status(404).send("Role can not found.");

    return res.status(200).json(role);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.CreateRole = async (req, res) => {
  const { name } = req.body;
  const createModel = {
    name: name,
  };
  try {
    const role = Role.findOne({ name: name });
    if (role == null)
      return res.status(500).json("There is a role that has the same name.");

    await Role.create(createModel);
    return res.status(200).json("Role successfully created.");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.UpdateRole = async (req, res) => {
  const { id } = req.params;
  var { name } = req.body;

  try {
    const role = await Role.findOne({ _id: id });
    if (role == null) return res.status(404).send("Role can not found.");

    role.name = name;
    role.updatedAt = Date.now();
    await role.save();
    return res.status(200).json({ message: "Role successfully updated." });
  } catch (error) {
    console.error = error;
    return res.status(500).json(error);
  }
};

exports.DeleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteDoc = await Role.deleteOne({ _id: id });
    if (deleteDoc.deletedCount == 0)
      return res.status(404).json("Role can not found.");

    return res.status(200).json({ message: "Role successfully deleted." });
  } catch (error) {
    console.error = error;
    return res.status(500).json(error);
  }
};
