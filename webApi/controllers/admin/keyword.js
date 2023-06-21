const { KeywordModel } = require("../../models/index");

exports.GetKeywords = (req, res) => {
  KeywordModel.find()
    .select("-_id -__v")
    .then((keywords) => {
      return res.status(200).json(keywords);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500);
    });
};

exports.GetKeywordById = (req, res) => {
  const { id } = req.params;
  KeywordModel.findOne({ _id: id })
    .select("-_id -__v")
    .then((keyword) => {
      if (keyword == null)
        return res.status(404).send("Keyword can not found.");

      return res.status(200).json(keyword);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500);
    });
};

exports.CreateKeyword = async (req, res) => {
  const { name } = req.body;
  const createModel = new KeywordModel({
    name: name,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  try {
    const keyword = await KeywordModel.findOne({ name: name });
    if (keyword != null)
      return res.status(501).json("There is a keyword that has the same name.");

    const createdKeyword = await KeywordModel.create(createModel);
    return res.status(200).json(createdKeyword);
  } catch (error) {
    console.error = error;
    return res.status(500).json(error);
  }
};

exports.UpdateKeyword = async (req, res) => {
  const { id } = req.params;
  var { name } = req.body;
  
  try {
    const keyword = await KeywordModel.findOne({ _id: id });
    if (keyword == null) 
      return res.status(404).send("Keyword can not found.");

    name = name != "" ? name : keyword.name;
    const updateModel = {
      name: name,
      updatedAt: Date.now()
    };
    await KeywordModel.updateOne({ _id: id }, updateModel);
    return res.status(200).json({ message: "Keyword successfully updated." });
  } catch (error) {
    console.error = error;
    return res.status(500).json(error);
  }
};

exports.DeleteKeyword = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteDoc = await KeywordModel.deleteOne({ _id: id });
    if(deleteDoc.deletedCount == 0)
      return res.status(404).json("Keyword can not found.");

    return res.status(200).json({ message: "Keyword successfully deleted." });
  } catch (error) {
    console.error = error;
    return res.status(500).json(error);
  }
};
