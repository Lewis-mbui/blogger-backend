const {registerUser} = require('../services/users.service');

async function register(req, res, next) {
    const result = await registerUser(req.body);

    return res.status(201).json(result);
}

module.exports = register;