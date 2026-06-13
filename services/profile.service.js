const User = require('../models/User');

const getProfile = (userId) => {
  return User.findById(userId);
}

module.exports = {
  getProfile
}