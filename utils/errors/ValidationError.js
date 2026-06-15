const AppError = require('./AppError');

class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, "VALIDATION_ERROR", details);
  }
}

module.exports = ValidationError;