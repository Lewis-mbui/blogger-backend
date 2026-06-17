const {createPost} = require('../../../../services/posts.service');
const Post = require('../../../../models/Post');

jest.mock('../../../../models/Post');

describe('Posts Service - createPost()', () => {
  let userId;
  let postData;
  let status;

  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    userId = 'abc';
    postData = {title: 'title', content: 'content', status: 'draft'};

    const savedPost = {
      _id: 'def',
      author: userId,
      ...postData
    }

    savedPost.save = jest.fn().mockReturnValue(savedPost);
    Post.mockReturnValue(savedPost);
  })


  it('should return a post with provided details', () => {
    const result = createPost(userId, postData)

    expect(result).toMatchObject(postData);
    expect(result._id).toBe('def');
    expect(result.author).toBe('abc');
  });


  it('should set publishedAt property if the post status is publisehd', () => {
    postData.status = 'published'

    const result = createPost(userId, postData);
    
    expect(result.publishedAt).toBeDefined();
    expect(result.publishedAt).toBeInstanceOf(Date);
  });
});