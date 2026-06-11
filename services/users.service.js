const _ = require('lodash');
const User = require('../models/User');
const ConflictError = require('../utils/errors/ConflictError');
const hashPassword = require('../utils/hashPassword');
const generateJwt = require('../utils/generateJwt');

async function registerUser(user) {
  // if user exists throw an error
  const existingUser = await User.findOne({email: user.email});

  if (existingUser)
    throw new ConflictError("Email already in use");
  
  // Email doesn't exist --> create new user
  user = new User(_.pick(user, ['name', 'email', 'password', 'bio', 'avatar']));
  user.password = await hashPassword(user.password);
  await user.save();

  // generate token
  // return {_id, email, name, token}
  const token = generateJwt(_.pick(user, ['_id']));

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