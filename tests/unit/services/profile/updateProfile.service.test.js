const User = require('../../../../models/User');
const ConflictError = require('../../../../utils/errors/ConflictError');
const ValidationError = require('../../../../utils/errors/ValidationError');
const {updateProfile} = require('../../../../services/profile.service');

jest.mock('../../../../models/User')

describe('Profile Service - updateProfile()', () => {
  afterEach(() => jest.clearAllMocks());

  const userId = 'abc';

  it('should throw if password is provided for update', async () => {
    const updates = {name: 'bbb', password: 'NewPass123!'}

    await expect(updateProfile(userId, updates))
      .rejects.toBeInstanceOf(ValidationError);
  });

  it('should throw if updated email already exists', async () => {
    const updates = {name: 'bbb', email: 'b@mail.com'};

    User.findOne.mockResolvedValue({
      _id: {
        toHexString: jest.fn()
          .mockReturnValue('def')
      }
    });

    await expect(updateProfile(userId, updates))
      .rejects.toBeInstanceOf(ConflictError);
  });

  it('should return a user with updated details', async () => {
    const updates = {name: 'bbb', bio: 'my new bio'};

    User.findByIdAndUpdate.mockResolvedValue({
      _id: userId,
      bio: 'my bio',
      ...updates
    });

    const updatedUser = await updateProfile(userId, updates);

    expect(updatedUser).toMatchObject(updates);
    expect(updatedUser).toHaveProperty('_id', 'abc');
    expect(updatedUser).toHaveProperty('name', 'bbb');
    expect(updatedUser).toHaveProperty('bio', 'my new bio');
  });
});