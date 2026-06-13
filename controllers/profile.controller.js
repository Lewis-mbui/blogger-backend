const successResponse = require('../utils/response/successResponse');
const {getProfile} = require('../services/profile.service');
const { identity } = require('lodash');

const getProfileController = async (req, res) => {
  const { id } = req.user;
  const profile = await getProfile(id);

  return successResponse({res, data: profile});
}

module.exports = {
  getProfileController
}