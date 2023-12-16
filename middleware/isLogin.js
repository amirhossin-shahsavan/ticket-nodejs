const User = require("../model/User");
const { appErr, AppErr } = require("../utils/errHandler");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = async (req, res, next) => {
  const token = getTokenFromHeader(req);

  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    next(AppErr("invalid/Expire token , please login again", 401));
  }

  req.userAuth = decodedUser.id;
  req.user = await User.findOne({ _id: req.userAuth });

  next();
};

module.exports = isLogin;
