const request = require('supertest');
const {
  connectDatabase,
  clearDatabase,
  closeDatabase
} = require('../dbHandler');
const app = require('../../../startup/app');
const User = require('../../../models/User');

describe('/api/users', () => {  
  beforeAll(async () => await connectDatabase());
  afterEach(async () =>  await clearDatabase());
  afterAll(async () => await closeDatabase());

  describe('POST /', () => {
    let name;
    let email;
    let password;

    const exec = () => {
      return request(app)
        .post('/api/users')
        .send({name, email, password});
    }

    beforeEach(() => {
      name = 'aaa';
      email = "a@mail.com";
      password = "Password123!";
    });

    it('should return 400 if name is missing', async () => {
      name = undefined;

      const res = await exec();

      expect(res.body.details[0].field).toMatch(/.*name.*/i);
      expect(res.status).toBe(400);
    });

    it('should return 400 if name is less than 2 chars', async () => {
      name = 'a';

      const res = await exec();

      expect(res.body.details[0].field).toMatch(/.*name.*/i);
      expect(res.status).toBe(400);
    });

    it('should return 400 if name is more than 50 characters', async () => {
      name = new Array(52).join('a');

      const res = await exec();

      expect(res.body.details[0].field).toMatch(/.*name.*/i);
      expect(res.status).toBe(400);
    })

    it('should return 400 if email is missing', async () => {
      email = undefined;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*email.*/i);
    });

    it('should return 400 if email is not a valid email', async () => {
      email = 'abcdef';

      const res = await exec();
      
      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*email.*/i);
    });

    it('should return 400 if password is missing', async () => {
      password = undefined;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*password.*/i);
    });

    it('should return 400 if password is more than 100 characters', async () => {
      password = new Array(90).join('a') + 'Password123!'; // total 101 characters

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*password.*/i);
    });

    it('should return 400 if password is less than 8 characters', async () => {
      password = "Pass1!";

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*password.*/i);
    });

     it('should return 400 if password does not have a lowercase letter', async () => {
      password = "PASSWORD123!";

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*password.*/i);
    });

     it('should return 400 if password does not have an uppercase letter', async () => {
      password = "password123!";

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*password.*/i);
    });

    it('should return 400 if password does not have a number', async () => {
      password = "Password!";

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.details[0].field).toMatch(/.*password.*/i);
    });

    it('should return 409 if user already exists', async () => {
      const user = new User({name: 'aaa', email: 'a@mail.com', password: 'Password123!'});
      await user.save();

      const res = await exec();

      expect(res.status).toBe(409);
    });

    it('should return the user if request is valid', async () => {
      const res = await exec();

      const {data} = res.body;
      
      expect(data).toHaveProperty('user');
      expect(data.user).toHaveProperty('_id');
      expect(data.user).toHaveProperty('name', 'aaa');
    });

    it('should return token if request is valid', async () => {
      const res = await exec();

      const {data} = res.body;

      expect(data).toHaveProperty('token');
      expect(data.token).toBeDefined();
    });

    it('should not return the password to the user if request is valid', async () => {
      const res = await exec();

      const {data} = res.body;
      
      expect(data.user.password).toBeFalsy();
    });

    it('should save the user to db if request is valid', async () => {
      await exec();

      const user = await User.findOne({email: 'a@mail.com'});

      expect(user).not.toBeNull();
    });
  });
});