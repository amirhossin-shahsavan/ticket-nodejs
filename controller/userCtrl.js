const generateToken = require("./../utils/generateToken");
const User = require("../model/User");

const registerUser = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const userFound = await User.findOne({ email });
  if (userFound) {
    return next(appErr("User Already Exist", 500));
  }

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: password,
    role: "user",
  });
  res.json({
    status: "success",
    data: user,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (!userFound) {
    return next(appErr("email or password wrong", 500));
  }
  var isok = await userFound.ComparePasssword(password, userFound.password);
  if (!isok) {
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
