const generateToken = require("./../utils/generateToken");
const User = require("../model/User");
const appErr = require("../utils/errHandler");

const registerUser = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: password,
  });
  if (!user) {
    return res.status(400).json(appErr("User Already Exist", 400));
  }
  res.json({
    status: "success",
    data: user,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (!userFound) {
    return res.status(402).json(appErr("email or password wrong", 402));
  }
  var isok = await userFound.ComparePasssword(password, userFound.password);
  if (!isok) {
    return res.status(402).json(appErr("invalid login credentional", 402));
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
