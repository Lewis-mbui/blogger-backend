const AppError = require('./AppError');

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 401, "UNAUTHORIZED")
  }
}

module.exports = UnauthorizedError;