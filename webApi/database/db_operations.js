const mongoose = require("mongoose");
const { KeywordModel } = require("../models/index");

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected MongoDb database.");
  } catch (error) {
    console.error(error);
  }
};

async function isDatabaseEmpty() {
  if ((await KeywordModel.findOne()) != null) {
    return false;
  }

  return true;
}

exports.generateData = async () => {
  if ((await isDatabaseEmpty()) == true) {
    KeywordModel.insertMany([
      {
        name: "Science",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Programming",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Education",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]);
  }
};
