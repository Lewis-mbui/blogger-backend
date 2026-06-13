const _ = require('lodash');
const {registerUser} = require('../services/users.service');
const successResponse = require('../utils/response/successResponse');

async function register(req, res, next) {
    const {user, token} = await registerUser(_.pick(req.body, ['name', 'email', 'password', 'bio', 'avatar']));

    return successResponse({
        res,
        statusCode: 201,
        data: {
          user: {_id: user._id, name: user.name, email: user.email},
          token
        }
      });
}

module.exports = register;