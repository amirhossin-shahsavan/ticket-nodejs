const appErr = (message, statusCode) => {
  return {
    code: statusCode * -1,
    msg: message,
  };
};

const AppErr = (message, statusCode) => {
  let error = new Error(message);
  error.statusCode = statusCode ? statusCode : 500;
  error.stack = error.stack;
  return error;
};

module.exports = { appErr, AppErr };
