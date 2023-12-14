const appErr = require("../utils/errHandler");

const isAdmin = (req, res, next) => {
  if (req.user.permission != "admin") {
    return res.status(402).json(appErr("Permission Denied", 402));
  }
  next();
};

module.exports = isAdmin;
