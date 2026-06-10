const Joi = require('joi');

const registerUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .trim()
    .messages({
      "string.base": "Name must be a string",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must be at most 50 characters",
      "any.required": "Name is required",
    }),
  email: Joi.string()
    .email()
    .min(5)
    .max(255)
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
      "any.required": "Password is required",
    }),
  bio: Joi.string()
    .max(500)
    .optional(),
  avatar: Joi.string()
    .uri()
    .optional()
}).required().messages({"any.required": 'User is required.'});

module.exports = registerUserSchema;