const { check } = require("express-validator");

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
