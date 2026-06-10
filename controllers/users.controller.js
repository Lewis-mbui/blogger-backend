const {registerUser} = require('../services/users.service');

async function register(req, res, next) {
  try {
    console.log(req.body);
    const result = await registerUser(req.body);

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = register;