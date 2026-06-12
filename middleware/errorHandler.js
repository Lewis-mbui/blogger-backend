const AppError = require('../utils/errors/AppError');

module.exports = function(err, req, res, next) {
  // console.error(err.message, err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      code: err.code,
      message: err.message,
      details: err.details
    });
  }
  
  // Unknown system errors
  const response = {
    status: "error",
    code: "INTERNAL_ERROR",
    message: "Something went wrong",
  };

  // DEV ONLY stack trace
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(500).json(response);
}