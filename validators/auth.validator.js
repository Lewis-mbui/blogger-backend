const Joi = require('joi');

const authSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .trim()
    .lowercase()
    .messages({
      "string.email": "Please provide a valid email",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .max(100)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must include uppercase, lowercase, and a number",
      "string.max": "Password cannot be more than 100 characters",
      "any.required": "Password is required",
    }),
  }
).required().messages({"any.required": 'User is required.'});

module.exports = authSchema;