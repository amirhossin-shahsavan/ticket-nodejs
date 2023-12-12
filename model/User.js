const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastname: {
    type: String,
    required: [true, "last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password Name is required"],
  },
  role: {
    type: String,
    enum: ["Admin", "Guest", "Editor"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
