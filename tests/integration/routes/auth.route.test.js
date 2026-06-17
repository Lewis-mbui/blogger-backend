const request = require('supertest');
const {
  connectDatabase,
  clearDatabase,
  closeDatabase
} = require('../dbHandler');
const app = require('../../../startup/app');
const User = require('../../../models/User');

describe('POST /api/auth', () => {
  beforeAll(async () => await connectDatabase());
  afterEach(async () =>  await clearDatabase());
  afterAll(async () => await closeDatabase());

  let email;
  let password;

  const exec = () => {
    return request(app)
      .post('/api/auth')
      .send({email, password});
  }

  beforeEach(async () => {
    const user = new User({name: 'aaa', email: 'a@mail.com', password: 'Password123!'});
    await user.save();

    email = "a@mail.com";
    password = 'Password123!';
  });

  it('should return 400 if email is missing from request', async() => {
    email = undefined;

    const res = await exec();
    const {details} = res.body;

    expect(res.status).toBe(400);
    expect(details[0].message).toMatch(/.*email.*/i);
  });

  it('should return 400 if email is not a valid email', async () => {
    email = 'abcdef';

    const res = await exec();
    
    expect(res.status).toBe(400);
    expect(res.body.details[0].message).toMatch(/.*email.*/i);
  });

  it('should return 400 if password is missing', async() => {
    password = undefined;

    const res = await exec();
    const {details} = res.body;

    expect(res.status).toBe(400);
  });

  it('should return 400 if password is missing', async() => {
    password = undefined;

    const res = await exec();
    const {details} = res.body;

    expect(res.status).toBe(400);
  });

  it('should return 400 if password is more than 100 characters', async () => {
    password = new Array(90).join('a') + 'Password123!'; // total 101 characters

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.body.details[0].message).toMatch(/.*password.*/i);
  });

  it('should return 400 if password is less than 8 characters', async () => {
    password = "Pass1!";

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.body.details[0].message).toMatch(/.*password.*/i);
  });

    it('should return 400 if password does not have a lowercase letter', async () => {
    password = "PASSWORD123!";

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.body.details[0].message).toMatch(/.*password.*/i);
  });

    it('should return 400 if password does not have an uppercase letter', async () => {
    password = "password123!";

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.body.details[0].message).toMatch(/.*password.*/i);
  });

  it('should return 400 if password does not have a number', async () => {
    password = "Password!";

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.body.details[0].message).toMatch(/.*password.*/i);
  });

  it('should return 400 if user is not registered', async () => {
    email = 'b@mail.com';

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if password is incorrect', async () => {
    password = 'PassWord123!';

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return a user if request is valid', async () => {
    const res = await exec();

    const {data} = res.body;

    expect(res.status).toBe(200);
    expect(data).toHaveProperty('user');
    expect(data.user).toHaveProperty('name', 'aaa');
  });

  it('should return a token if request is valid', async () => {
    const res = await exec();

    const {data} = res.body;

    expect(data).toHaveProperty('token');
    expect(data.token).toBeDefined();
  });

  it('should not return password if request is valid', async () => {
    const res = await exec();

    const {data} = res.body;

    expect(data.user).not.toHaveProperty('password');
  });
});