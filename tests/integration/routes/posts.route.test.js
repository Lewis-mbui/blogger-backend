const request = require('supertest');
const Post = require('../../../models/Post');
const app = require('../../../startup/app');
const {registerUser} = require('../../../services/users.service');
const {
  connectDatabase,
  clearDatabase,
  closeDatabase
} = require('../dbHandler');

describe('/api/posts', () => {
  beforeAll(async () => await connectDatabase());
  afterAll(async () => await closeDatabase());
  afterEach(async () => await clearDatabase());

  describe('POST /', () => {
    let token;
    let user;
    let title;
    let content;
    let status

    const exec = () => request(app)
      .post('/api/posts')
      .send({title, content, status})
      .auth(token, {type: "bearer"});

    beforeEach(async () => {
      const {user: authenticatedUser, token: userToken} = await registerUser({name: 'aaa', email: 'a@mail.com', password: 'Password123!'});
      token = userToken;
      user = authenticatedUser;
      title = 'title';
      content = 'content';
      status = 'draft';
    });

    it('should return 401 if author is not logged in', async () => {
      token = undefined;

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if title is missing in request body', async () => {
      title = undefined;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*title.*/i);
    });

    it('should return 400  if title is less than 2 characters', async () => {
      title = 'a'
    
      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*title.*/i);
    });

    it('should return 400  if title is more than 200 characters', async () => {
      title = new Array(202).join('a'); // 201 characters
    
      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*title.*/i);
    });

    it('should return 400 if content is missing in request body', async () => {
      content = undefined;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*content.*/i);
    });

    it('should return 400 if content is less than 2 characters', async () => {
      content = 'a';

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*content.*/i);
    });

    it('should return 400 if status is missing in request body', async () => {
      status = undefined;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*status.*/i);
    });

    it('should return 400 if status is NOT "published" or "draft"', async () => {
      status = 'abc';

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*status.*/i);
    });

    it('should return created post if request is valid', async () => {  
      const res = await exec();

      const {data} = res.body;

      expect(res.status).toBe(201);
      expect(data.author).toBe(user._id.toHexString());
    });

    it('should save the post in the database if it is valid', async () => {
      await exec();

      const post = await Post.findOne({author: user._id.toHexString()});

      expect(post).not.toBeNull();
      expect(post.title).toBe('title');
      expect(post.content).toBe('content');
    });
  });
});