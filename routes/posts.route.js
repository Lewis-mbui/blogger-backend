const validate = require('../middleware/validate');
const createPostSchema = require('../validators/posts.validator');
const auth = require('../middleware/auth');
const {createPostController} = require('../controllers/posts.controller');
const express = require('express');
const router = express.Router();

router.post('/', auth, validate(createPostSchema), createPostController);

module.exports = router;