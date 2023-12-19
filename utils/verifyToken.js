const jwt = require("jsonwebtoken");
const { appErr } = require("./errHandler");
const verifyToken = (token, next) => {
  if (token == false) {
    return false;
  }
  return jwt.verify(token, global.dotenv.JWT_KEY, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = verifyToken;
