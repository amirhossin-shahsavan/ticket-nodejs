const {appErr} = require("../utils/errHandler");

const isAdmin = (req, res, next) => {
  if (req.user.permission != "admin" && req.user.permission != "support") {
    return res.status(402).json(appErr("Permission Denied", 402));
  }
  next();
};

module.exports = isAdmin;
