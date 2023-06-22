const mongoose = require("mongoose");
const { Keyword, Role } = require("../models/index");

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected MongoDb database.");
  } catch (error) {
    console.error(error);
  }
};

async function isDatabaseEmpty() {
  if ((await Keyword.findOne()) != null) {
    return false;
  }

  if ((await Role.findOne()) != null) {
    return false;
  }

  return true;
}

exports.generateData = async () => {
  if ((await isDatabaseEmpty()) == true) {
    Keyword.insertMany([
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

    Role.insertMany([
      {
        name: "User",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Admin",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]);
  }
};
