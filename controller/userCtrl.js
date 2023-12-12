const bcrypt = require("bcrypt");
const generateToken = require("./../utils/generateToken");
const User = require("../model/User");

const registerUser = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const userFound = await User.findOne({ email });
  if (!userFound) {
    return next(appErr("User Already Exist", 500));
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedpass,
  });
  res.json({
    status: "success",
    data: user,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  userFound = await User.findOne({ email });
  if (!userFound) {
    return next(appErr("email or password wrong", 500));
  }

  const isPasswordMatch = await bcrypt.compare(password, userFound.password);
  if (!isPasswordMatch) {
    return next(appErr("invalid login credentional", 500));
  }
  res.json({
    status: "success",
    data: {
      firstname: userFound.firstname,
      lastname: userFound.lastname,
      email: userFound.email,
      isAdmin: userFound.isAdmin,
      token: generateToken(userFound._id),
    },
  });
};
module.exports = {
  registerUser,
  loginUser,
};
