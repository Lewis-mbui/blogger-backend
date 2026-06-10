module.exports = (schema) => (req, res, next) => {
    const {error, value} = schema.validate(req.body, { abortEarly: false });


    if (error) return res.status(400).json({
      message: "Validation error",
      errors: error.details.map(err => ({
        field: err.path.join('.'), // The field that caused the error
        message: err.message,     // The Joi generated/custom error message
      }))
    });

    req.body = value;
    next();
  }
