const request = require('supertest');
const app = require('../../../../startup/app');
const User = require('../../../../models/User');
const {registerUser} = require('../../../../services/users.service');
const {
  connectDatabase,
  clearDatabase,
  closeDatabase
} = require('../../dbHandler');

describe('PATCH /api/profile', () => {
  beforeAll(async () => await connectDatabase());
  afterEach(async () =>  await clearDatabase());
  afterAll(async () => await closeDatabase());

  let token;
  let registeredUser;
  let name;
  let email;
  let bio;
  let avatar;

  const exec = () => request(app)
    .patch('/api/profile')
    .auth(token, {type: "bearer"})
    .send({
      name, 
      email, 
      bio,
      avatar
    });

  beforeEach(async () => {
    const {token: userToken, user} = await registerUser({
      name: 'aaa', 
      email: 'a@mail.com', 
      password: 'Password123!'
    });

    token = userToken;
    registeredUser = user;
    name = 'bbb';
    email = 'b@mail.com';
    bio = 'my bio';
    avatar = 'http://avatar.jpg';
  });

  it('should return 401 if user is not logged in', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if no field is provided for update', async () => {
    name = undefined;
    email = undefined;
    bio = undefined;
    avatar = undefined;

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if updated name is less than 2 characters', async () => {
    name = 'b'

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.body.details[0].field).toMatch(/.*name.*/i);
  });

  it('should return 400 if updated name is more than 50 characters', async () => {
    name = new Array(52).join('b'); // 51 characters

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.body.details[0].field).toMatch(/.*name.*/i);
  });

  it('should return 400 if updated email is not a valid email', async () => {
    email = 'mail';

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.body.details[0].field).toMatch(/.*email.*/i);
  });

  it('should return 400 if updated bio is more than 500 characters', async () => {
    bio = new Array(502).join('a'); // 501 characters

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.body.details[0].field).toMatch(/.*bio.*/i);
  });

  it('should return 400 if updated avatar is not a valid uri', async () => {
    avatar = 'avatar';

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.body.details[0].field).toMatch(/.*avatar.*/i);
  });

  it('should return 409 if updated email already exists', async () => {
    await registerUser({
      name: 'bbb',
      email: 'b@mail.com',
      password: 'Password123!'
    });

    const res = await exec();

    expect(res.status).toBe(409);
  });

  it('should return updated user if request is valid', async () => {
    const res = await exec();

    const user = res.body.data;

    expect(res.status).toBe(200);
    expect(user.name).toBe('bbb');
    expect(user.email).toBe('b@mail.com');
    expect(user.bio).toBe('my bio');
    expect(user.avatar).toBe('http://avatar.jpg');
  });

  it('should update profile details in database if request is valid', async () => {
    await exec();

    const user = await User.findById({_id: registeredUser._id});
    
    expect(user.name).toBe('bbb');
    expect(user.email).toBe('b@mail.com');
    expect(user.bio).toBe('my bio');
    expect(user.avatar).toBe('http://avatar.jpg');
  });
});