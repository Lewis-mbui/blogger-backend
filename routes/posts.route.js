const {createPostController} = require('../controllers/posts.controller');
const express = require('express');
const router = express.Router();

router.post('/', createPostController);

module.exports = router;