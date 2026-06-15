const {
  connectDatabase,
  clearDatabase,
  closeDatabase
} = require('../dbHandler');
const User = require('../../../models/User');

describe('User', () => {
  beforeAll(async () => await connectDatabase());
  afterEach(async () =>  await clearDatabase());
  afterAll(async () => await closeDatabase());

  it('should create a user with hashed password', async () => {

    const password = 'Password123!';

    const user = new User({
      name: 'aaa',
      email: 'a@mail.com',
      password,
    });

    await user.save();

    expect(user.password).not.toBe(password);
  });
});