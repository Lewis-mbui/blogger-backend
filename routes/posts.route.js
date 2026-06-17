const validate = require('../middleware/validate');
const {
  createPostSchema,
  getPostsSchema 
} = require('../validators/posts.validator');
const auth = require('../middleware/auth');
const {
  createPostController,
  getPostsController
} = require('../controllers/posts.controller');
const express = require('express');
const router = express.Router();

router.post('/', auth, validate(createPostSchema), createPostController);

router.get('/', validate(getPostsSchema, 'query'), getPostsController);

module.exports = router;