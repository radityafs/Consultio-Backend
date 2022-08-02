/* eslint-disable consistent-return */
const { verifyToken } = require('../helpers/jwt');
const { failed } = require('../helpers/response');

const AuthJwt = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return failed(res, 401, 'Access denied, no token provided');
    }

    const verify = verifyToken(token);
    if (!verify) {
      failed(res, 401, 'Unauthorized access, invalid token');
    }

    next();
  } catch (err) {
    failed(res, 500, err.message);
  }
};

module.exports = AuthJwt;
