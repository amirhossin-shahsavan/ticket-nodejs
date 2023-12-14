const appErr = (message, statusCode) => {
  return {
    code: statusCode * -1,
    msg: message,
  };
};

module.exports = appErr;
