const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(200)
    .required()
    .trim()
    .messages({
      "string.base": "Post title must be a string",
      "string.min": "Post title must be at least 2 characters",
      "any.required": "Post title is required"
    }),
  content: Joi.string()
    .min(2)
    .required()
    .trim()
    .messages({
      "any.required": "Post content is required",
      "string.base": "Post content must be a string",
      "string.min": "Post content must contain at least 2 characters",
    }),
  status: Joi.string()
    .valid('draft', 'published')
    .required()
    .messages({
      "string.base": "Post status must be a string",
      'any.only': "Post status can either be published or draft",
      "any.required": "Post status is required",
    })
}).required().messages({"any.required": "Post is required"});

module.exports = createPostSchema;