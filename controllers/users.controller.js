const {registerUser} = require('../services/users.service');
const successResponse = require('../utils/response/successResponse');

async function register(req, res, next) {
    const result = await registerUser(req.body);

    return successResponse({res, data: result, statusCode: 201});
}

module.exports = register;