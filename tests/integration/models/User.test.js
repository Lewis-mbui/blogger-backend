const mongoose = require('mongoose');
const User = require('../../../models/User');
const connectDb = require('../../../startup/connectDb');

describe('User', () => {
  beforeAll(async () => {
      await connectDb();
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });

    afterEach(async () => {
      await User.deleteMany({});
    })

  it('should create a user with hashed password', async () => {

    const password = 'Password123!';

    const user = new User({
      name: 'aa',
      email: 'a@mail.com',
      password,
    });

    await user.save();

    expect(user.password).not.toBe(password);
  });
});