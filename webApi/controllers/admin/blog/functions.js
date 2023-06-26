const { Keyword, User } = require("../../../models");
const mongoose = require("mongoose");

exports.isAuthorValid = async (id) => {
  id = new mongoose.Types.ObjectId(id);
  const author = await User.findOne({ _id: id }).select("_id");
  if (author == null) return false;
  else return true;
};

exports.isKeywordsValid = async (keywords) => {
  keywords = await keywords.map((id) => new mongoose.Types.ObjectId(id));
  for (const index in keywords) {
    const id = keywords[index];
    const keyword = await Keyword.findOne({ _id: id });
    if (keyword == null) return false;
  }

  return true;
};

// exports.checkIfBodyIsValid = async (req,res) => {
//   if (!(await isAuthorValid(req.body.author)))
//     return res.status(500).json("Author is invalid");

//   if (!(await isKeywordsValid(req.body.keywords)))
//     return res.status(500).json("Keywords are invalid");
// };
