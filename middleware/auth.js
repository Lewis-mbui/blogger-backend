const jwt = require('jsonwebtoken');
const config = require('config');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) throw new UnauthorizedError("Access Denied. No token provided.");

  try {
    const jwtToken = token.replace("Bearer ", "");
    const payload = jwt.verify(jwtToken, config.get('jwtPrivateKey'));

    req.user = {id: payload.id};
    next();
  }
  catch (err) {
    if (err.name === "TokenExpired") throw new UnauthorizedError("Token Expired.");

    else throw new UnauthorizedError("Invalid token.");
  }
}