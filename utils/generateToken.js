const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, global.dotenv.JWT_KEY, { expiresIn: "7d" });
};

module.exports = generateToken;
