const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
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
