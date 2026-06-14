const ConflictError = require('../utils/errors/ConflictError');
const User = require('../models/User');

const getProfile = (userId) => {
  return User.findById(userId);
}

const updateProfile = async (userId, updates) => {
  if (updates.email) {
    const existingUser = await User.findOne({email: updates.email});

    // if existing user is found
    // and it is not current user
    if (existingUser &&  existingUser._id.toHexString() !== userId)
      throw new ConflictError('Email already exists');
  }

  // update with run validators: true and return document --> after
  return User.findByIdAndUpdate(userId, updates, {
    runValidators: true,
    returnDocument: "after"
  });
}

module.exports = {
  getProfile,
  updateProfile
}