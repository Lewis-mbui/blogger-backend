const request = require('supertest');
const mongoose = require('mongoose');
const connectDb = require('../../../startup/connectDb');
const app = require('../../../startup/app');
const User = require('../../../models/User');

describe('/api/users', () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /', () => {

    const exec = () => {
      return request(app)
        .post('/api/users')
        .send({name: 'aaa', email: "a@b.com", password: "Password123!"});
    }

    it('should return the user if it is valid', async () => {
      const res = await exec();

      const {data} = res.body;
      
      expect(data).toHaveProperty('user');
      expect(data.user).toHaveProperty('_id');
      expect(data.user).toHaveProperty('name', 'aaa');
    });

    it('should return token if it is valid', async () => {
      const res = await exec();

      const {data} = res.body;

      expect(data).toHaveProperty('token');
      expect(data.token).toBeDefined();
    });

    it('should not return the password to the user', async () => {
      const res = await exec();

      const {data} = res.body;
      
      expect(data.user.password).toBeFalsy();
    });

    it('should save the user to db if it is valid', async () => {
      await exec();

      const user = await User.findOne({email: 'a@b.com'});

      expect(user).not.toBeNull();
    });
  });
});