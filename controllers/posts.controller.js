const {createPost, getPosts} = require('../services/posts.service');
const successResponse = require('../utils/response/successResponse');

const createPostController = async (req, res) => {
  const newPost = await createPost(req.user.id, req.body);
  
  return successResponse({res, data: newPost, statusCode: 201});
}

const getPostsController = async (req, res) => {
  const result = await getPosts(req.query);
  return successResponse({res, data: result});
}

module.exports = {
  createPostController,
  getPostsController
};