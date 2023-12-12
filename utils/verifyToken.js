const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
  return jwt.verify(token, global.dotenv.JWT_KEY, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = verifyToken;
