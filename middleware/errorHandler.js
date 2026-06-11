const AppError = require('../utils/errors/AppError');

module.exports = function(err, req, res, next) {
  console.error(err.message, err);

  if (err instanceof AppError) 
    return res.status(err.statusCode).json({message: err.message});
  return res.status(500).json({message: "Something went wrong"})
}