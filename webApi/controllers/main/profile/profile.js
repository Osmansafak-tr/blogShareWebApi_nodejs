const { User } = require("../../../models");

exports.GetMyProfile = async (req, res) => {
  const user = req.user;

  const viewModel = {
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      dateOfBirth: user.dateOfBirth,
    },
  };

  return res.status(200).json(viewModel);
};

exports.UpdateMyProfile = async (req, res) => {
  const { name, surname, dateOfBirth } = req.body;

  const user = await User.findOne({ email: req.user.email });
  user.name = name;
  user.surname = surname;
  user.dateOfBirth = dateOfBirth;
  await user.save();

  return res.status(200).json({ message: "Profile updated successfully" });
};
