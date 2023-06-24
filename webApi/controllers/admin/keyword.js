const { Keyword } = require("../../models/index");

exports.GetKeywords = (req, res) => {
  Keyword.find()
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
  Keyword.findOne({ _id: id })
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
  const createModel = {
    name: name,
  };

  try {
    const keyword = await Keyword.findOne({ name: name });
    if (keyword != null)
      return res.status(501).json("There is a keyword that has the same name.");

    await Keyword.create(createModel);
    return res.status(200).json("Keyword successfully created.");
  } catch (error) {
    console.error = error;
    return res.status(500).json(error);
  }
};

exports.UpdateKeyword = async (req, res) => {
  const { id } = req.params;
  var { name } = req.body;
  
  try {
    const keyword = await Keyword.findOne({ _id: id });
    if (keyword == null) 
      return res.status(404).send("Keyword can not found.");

    keyword.name = name;
    keyword.updatedAt = Date.now();
    await keyword.save();
    return res.status(200).json({ message: "Keyword successfully updated." });
  } catch (error) {
    console.error = error;
    return res.status(500).json(error);
  }
};

exports.DeleteKeyword = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteDoc = await Keyword.deleteOne({ _id: id });
    if(deleteDoc.deletedCount == 0)
      return res.status(404).json("Keyword can not found.");

    return res.status(200).json({ message: "Keyword successfully deleted." });
  } catch (error) {
    console.error = error;
    return res.status(500).json(error);
  }
};
