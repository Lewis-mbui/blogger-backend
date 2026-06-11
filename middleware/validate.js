const ValidationError = require('../utils/errors/ValidationError');

module.exports = (schema) => (req, res, next) => {
    const {error, value} = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map(err => ({
        field: err.path.join('.'), // The field that caused the error
        message: err.message,     // The Joi generated/custom error message
      }));
  
      throw new ValidationError("Validation error", details);
    }

    req.body = value;
    next();
  }
