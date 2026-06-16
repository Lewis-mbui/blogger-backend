const {createPost} = require('../services/posts.service');
const successResponse = require('../utils/response/successResponse');
// const _ = require('lodash');

const createPostController = async (req, res) => {
  const newPost = await createPost(req.user.id, req.body);
  
  return successResponse({res, data: newPost, statusCode: 201});
}

module.exports = {
  createPostController
};