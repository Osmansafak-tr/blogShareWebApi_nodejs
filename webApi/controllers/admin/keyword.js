const { Keyword } = require("../../models/index");
const common = require("../../common/index");
const { AppError } = common.classes;
const { ErrorConstants } = common.constants;

exports.GetKeywords = async (req, res) => {
  const keywords = await Keyword.find().select("-__v");
  return res.status(200).json(keywords);
};

exports.GetKeywordById = async (req, res) => {
  const { id } = req.params;
  const keyword = await Keyword.findOne({ _id: id }).select("-__v");
  if (keyword == null)
    throw new AppError(ErrorConstants.DataNotFound, "Keyword can not found.");

  return res.status(200).json(keyword);
};

exports.CreateKeyword = async (req, res) => {
  const { name } = req.body;
  const createModel = {
    name: name,
  };

  const keyword = await Keyword.findOne({ name: name });
  if (keyword != null)
    throw new AppError(
      ErrorConstants.SameDataAlreadyCreated,
      "There is a keyword that has the same name."
    );

  await Keyword.create(createModel);
  return res.status(200).json("Keyword successfully created.");
};

exports.UpdateKeyword = async (req, res) => {
  const { id } = req.params;
  var { name } = req.body;

  const keyword = await Keyword.findOne({ _id: id });
  if (keyword == null)
    throw new AppError(ErrorConstants.DataNotFound, "Keyword can not found.");

  const keywordWithSameName = await Keyword.findOne({
    _id: { $ne: id },
    name: name,
  }).select("_id");
  if (keywordWithSameName != null)
    throw new AppError(
      ErrorConstants.SameDataAlreadyCreated,
      "There is a keyword that has the same name."
    );

  keyword.name = name;
  keyword.updatedAt = Date.now();
  await keyword.save();
  return res.status(200).json({ message: "Keyword successfully updated." });
};

exports.DeleteKeyword = async (req, res) => {
  const { id } = req.params;
  const deleteDoc = await Keyword.deleteOne({ _id: id });
  if (deleteDoc.deletedCount == 0)
    throw new AppError(ErrorConstants.DataNotFound, "Keyword can not found.");

  return res.status(200).json({ message: "Keyword successfully deleted." });
};
