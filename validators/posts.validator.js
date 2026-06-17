const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(200)
    .required()
    .trim()
    .messages({
      "string.base": "Post title must be a string",
      'string.empty': 'Title cannot be empty',
      "string.min": "Post title must be at least 2 characters",
      "any.required": "Post title is required"
  }),
  content: Joi.string()
    .min(2)
    .required()
    .trim()
    .messages({
      "string.base": "Post content must be a string",
      'string.empty': 'Content cannot be empty',
      "any.required": "Post content is required",
      "string.min": "Post content must contain at least 2 characters",
  }),
  status: Joi.string()
    .valid('draft', 'published')
    .required()
    .messages({
      'any.only': "Post status can either be published or draft",
      "any.required": "Post status is required",
  })
}).required().messages({"any.required": "Post is required"});

const getPostsSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .messages({
      'number.base': 'Page must be a valid number',
      'number.integer': 'Page must be a whole number',
      'number.min': 'Page must be at least 1'
    }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .messages({
      'number.base': 'Limit must be a valid number',
      'number.integer': 'Limit must be a whole number',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 50'
    })
});

module.exports = {
  createPostSchema,
  getPostsSchema
};