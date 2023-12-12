const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    enum: ["Admin", "Guest", "user"],
  },
});

userSchema.pre("save", async function (next) {
  var user = this;
  if (!user.password || user.password == "") {
    return next("Password Require");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(user.password, salt);
  user.password = hashedpass;
  next();
});

userSchema.methods.ComparePasssword = async function (password, hash) {
  const isPasswordMatch = await bcrypt.compare(password, hash);
  if (isPasswordMatch) {
    return true;
  } else {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
