const mongoose = require("mongoose");
// console.log(global.dotenv);
const dbConnect = async () => {
  try {
    console.log(`>>>>>>>>${global.dotenv.DB_URL}`);
    await mongoose.connect("mongodb://localhost:27017/ticket");
    console.log("db connected successfully.");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

dbConnect();
