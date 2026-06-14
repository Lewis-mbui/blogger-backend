const successResponse = require('../utils/response/successResponse');
const {getProfile, updateProfile} = require('../services/profile.service');
const _ = require('lodash');

const getProfileController = async (req, res) => {
  const { id } = req.user;
  const profile = await getProfile(id);

  return successResponse({res, data: profile});
};

const updateProfileController = async (req, res) => {
const updates = _.pick(req.body, ['name', 'email', 'bio', 'avatar']);
const updatedUser = await updateProfile(req.user.id, updates);

return successResponse({res, data: _.pick(updatedUser, [
  'name',
  'email',
  'bio',
  'avatar'
])});
};

module.exports = {
  getProfileController,
  updateProfileController
}