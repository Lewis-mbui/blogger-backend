const _ = require('lodash');
const User = require('../models/User');
const ConflictError = require('../utils/errors/ConflictError');
const generateJwt = require('../utils/generateJwt');

async function registerUser({name, email, password, bio, avatar}) {
  // if user exists throw an error
  const existingUser = await User.findOne({email});

  if (existingUser)
    throw new ConflictError("Email already in use");
  
  // User doesn't exist --> create new user
  const user = new User({
    name,
    email,
    password,
    bio,
    avatar
  });
  await user.save();

  // generate token
  // return {_id, email, name, token}
  const token = generateJwt({id: user._id});

  return {
    user: {
      ..._.pick(user, ['_id', 'name', 'email']),
    },
    token
  }
}

module.exports = {
  registerUser
}