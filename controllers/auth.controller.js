const successResponse = require('../utils/response/successResponse');

const login = (req, res) => {
  return successResponse({res, data: {message: "login"}});
}

module.exports = {
  login
}