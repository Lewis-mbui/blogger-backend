const Joi = require('joi');

const updateProfileSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .optional()
    .messages({
      "string.base": "Name must be a string",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must be at most 50 characters",
    }),
  email: Joi.string()
    .email()
    .optional()
    .trim()
    .lowercase()
    .messages({
      "string.email": "Please provide a valid email",
    }),
  bio: Joi.string()
    .max(500)
    .optional(),
  avatar: Joi.string()
    .uri()
    .optional()
}).min(1).required().messages({
  'any.min': "Expected minimum 1 field to be updated",
  "any.required": "Updates are required"
});

module.exports = updateProfileSchema;