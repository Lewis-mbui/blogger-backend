class AppError extends Error {
  constructor(message, statusCode, code, details = null) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = this.constructor.name;
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;