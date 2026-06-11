const _ = require('lodash');
const User = require('../models/User');
const hashPassword = require('../utils/hashPassword');
const generateJwt = require('../utils/generateJwt');

async function registerUser(user) {
  // if email exists return 409
  const existingUser = await User.findOne({email: user.email});

  if (existingUser)
    throw new Error("Email already in use");
  
  // create new user
  user = new User(_.pick(user, ['name', 'email', 'password', 'bio', 'avatar']));
  user.password = await hashPassword(user.password);
  await user.save();

  // generate token
  // send created {_id, email, name, token}
  const token = generateJwt(_.pick(user, ['_id', 'email']));

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