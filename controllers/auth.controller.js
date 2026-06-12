const _ = require('lodash');
const successResponse = require('../utils/response/successResponse');
const {loginUser} = require('../services/auth.service');

const login = async (req, res) => {
  const {email, password} = req.body;

  const {user, token} = await loginUser({email, password});
  
  return successResponse({
    res,
    data: {
      user: {_id: user._id, name: user.name, email: user.email},
      token
    }
  });
}

module.exports = {
  login
}