const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected MongoDb database.");
  } catch (error) {
    console.error(error);
  }
};
