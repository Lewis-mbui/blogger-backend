const Post = require('../models/Post');

const createPost = (userId, {title, content, status}) => {
  const post = new Post({
    title,
    content,
    status,
    author: userId,
  });

  if (status === "published") 
    post.publishedAt = new Date();

  return post.save();
};

module.exports = {
  createPost
}