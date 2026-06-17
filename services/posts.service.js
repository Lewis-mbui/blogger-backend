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

const getPosts = async ({page = 1, limit = 10}) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;
  const filter =  {status: "published"};

  const [posts, totalItems] = await Promise.all([
    Post.find(filter)
      .sort('-publishedAt')
      .select('title publishedAt status views')
      .skip(skip)
      .limit(limit)
      .populate('author', 'name avatar'),

    Post.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(totalItems / limit);
  return {
    posts,
    totalItems,
    totalPages,
    page,
    limit,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  }
}

module.exports = {
  createPost,
  getPosts
}