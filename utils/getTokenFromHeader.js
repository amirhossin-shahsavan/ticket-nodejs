const appErr = require("./errHandler");

const getTokenFromHeader = (req) => {
  const headerObj = req.headers;

  if (!headerObj["authorization"]) {
    return false;
  }

  const token = headerObj["authorization"].split(" ")[1];

  if (token !== undefined) {
    return token;
  } else {
    return false;
  }
};

module.exports = getTokenFromHeader;
