const config = require('config');
const auth = require('../../../middleware/auth');
const generateJwt = require('../../../utils/generateJwt');

describe('auth middleware', () => {
  it('should set user with id to the request if it is valid', () => {

    const payload = {id: '123'};
    const token = generateJwt(payload);

    const req = {
      header: jest.fn().mockReturnValue("Bearer " + token)
    }

    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(payload);
  });
});