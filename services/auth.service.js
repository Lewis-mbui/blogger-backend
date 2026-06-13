const bcrypt = require('bcrypt');
const generateJwt = require('../utils/generateJwt');
const User = require('../models/User');
const AppError = require('../utils/errors/AppError');
const { login } = require("../controllers/auth.controller")

const loginUser = async ({email, password}) => {
  const user = await User.findOne({email})
    .select('+password');

  if (!user) 
    throw new AppError("Invalid email or password", 400, "BAD_REQUEST");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    throw new AppError("Invalid email or password", 400, "BAD_REQUEST");

  const token = generateJwt({id: user._id});
  return { user, token }
}

module.exports = {
  loginUser
}