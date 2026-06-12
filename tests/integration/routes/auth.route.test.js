const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../startup/app');
const connectDb = require('../../../startup/connectDb');
const User = require('../../../models/User');

describe('/api/auth', () => {
  beforeAll(async () => {
    await connectDb();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /', () => {
    it('should return a user if request is valid', async () => {
      const user = new User({name: 'aaa', email: 'a@mail.com', password: 'Password123!'});
      console.log('new user --> ', user);

      await user.save();

      const savedUser = await User.findOne({email: user.email})
      console.log('fetched --> ', savedUser);

      const res = await request(app)
        .post('/api/auth')
        .send({email: 'a@mail.com', password: 'Password123!'});

      expect(res.status).toBe(200);
    });
  });
});