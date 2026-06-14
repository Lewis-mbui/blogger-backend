const request = require('supertest');
const mongoose = require('mongoose');
const connectDb = require('../../../startup/connectDb');
const User = require('../../../models/User');
const {registerUser} = require('../../../services/users.service');
const app = require('../../../startup/app');

describe('/api/profile', () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await mongoose.connection.close()
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('GET /', () => {
    let token;

    const exec = () => request(app)
      .get('/api/profile')
      .auth(token, {type: "bearer"});

    beforeEach(async () => {
      const {user, token: userToken} = await registerUser({
        name: 'aaa', 
        email: 'a@mail.com', 
        password: 'Password123!'
      });

      token = userToken;
    });

    it('should return 401 if user is not logged in', async() => {
      token = ''

      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return the user if request is valid', async () => {
      const res = await exec();

      const {data} = res.body;

      expect(res.status).toBe(200);
      expect(data._id).toBeDefined();
      expect(data.name).toBe('aaa');
      expect(data.email).toBe('a@mail.com');
    });

    it('should not return the password if request is valid', async () => {
      const res = await exec();

      const {data} = res.body;

      expect(data.password).not.toBeDefined();
    });
  });
});