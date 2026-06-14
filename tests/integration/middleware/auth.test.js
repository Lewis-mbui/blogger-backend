const request = require('supertest');
const {
  connectDatabase,
  clearDatabase,
  closeDatabase
} = require('../dbHandler');
const User = require('../../../models/User');
const {registerUser} = require('../../../services/users.service');
const app = require('../../../startup/app');

describe('auth middleware', () => {
  beforeAll(async () => await connectDatabase());
  afterEach(async () =>  await clearDatabase());
  afterAll(async () => await closeDatabase());

  let token;

  const exec = () =>  request(app)
      .get('/api/profile')
      .auth(token, {type: "bearer"});

  beforeEach(async () => {
    const {token: userToken} = await registerUser({
      name: 'aaa',
      email: 'a@mail.com',
      password: 'Password123!'
    });

    token = userToken;
  });

  it('should return 401 if no token is provided', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 401 if token is invalid', async () => {
    token = 'abc'

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});