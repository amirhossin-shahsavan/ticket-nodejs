const User = require("../model/User");
const appErr = require("../utils/errHandler");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isAdmin = async (req, res, next) => {
  const token = getTokenFromHeader(req);

  const decodedUser = verifyToken(token);

  req.userAuth = decodedUser.id;

  const user = await User.findById(decodedUser.id);

  if ((user.isAdmin = true)) {
    return next();
  } else {
    next(appErr("access denied", 403));
  }

  if (!decodedUser) {
    return next(appErr("invalid/Expire token , please login again"));
  } else {
    next();
  }
};

module.exports = isAdmin;
