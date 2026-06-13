const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function(payload) {
  // sign a payload: {_id, email} with a secret key
  return jwt.sign(payload, config.get('jwtPrivateKey'), {expiresIn: "2d"});
}