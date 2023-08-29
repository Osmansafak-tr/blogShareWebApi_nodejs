const { check, param } = require("express-validator");
const { Keyword } = require("../../../models");

exports.GetBlogByIdValidator = [
  param("id", "Id parameter's length should be 24").isLength(24),
];

exports.CreateBlogValidator = [
  check("title", "Title should be at least 3 characters length").isLength({
    min: 3,
  }),
  check("body", "Body should be at least 3 characters length").isLength({
    min: 3,
  }),
  check(
    "keywords",
    "Keywords should be an array and needs to have at least 1 item"
  ).isArray({ min: 1 }),
];

exports.UpdateBlog = [
  check("title", "Title should be at least 3 characters length").isLength({
    min: 3,
  }),
  check("body", "Body should be at least 3 characters length").isLength({
    min: 3,
  }),
  check("keywords").custom(async (keywords) => {
    if(keywords.length == 0)
      throw new Error("Keywords field can not be empty");

    for (i in keywords) {
      const id = keywords[i];
      if ((await Keyword.findOne({ _id: id })) == null)
        throw new Error("Keyword not found");
    }

  }),
];
