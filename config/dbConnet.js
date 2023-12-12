const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ticket");
    console.log("db connected successfully.");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

dbConnect();
