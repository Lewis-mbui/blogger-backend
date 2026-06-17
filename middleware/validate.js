const ValidationError = require('../utils/errors/ValidationError');

module.exports = (schema, property = 'body') => (req, res, next) => {
  const {error, value} = schema.validate(req[property], { 
    abortEarly: false, 
    stripUnknown: true 
  });

  if (error) {
    const details = error.details.map(err => ({
      field: err.path.join('.'), // The field that caused the error
      message: err.message,     // The Joi generated/custom error message
    }));

    throw new ValidationError("Validation error", details);
  }

  req[property] = value;
  next();
}
