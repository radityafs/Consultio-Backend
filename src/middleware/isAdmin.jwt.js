/* eslint-disable consistent-return */
const { verifyToken } = require('../helpers/jwt');
const { failed } = require('../helpers/response');

const AuthJwt = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return failed(res, 401, 'Access denied, no token provided');
    }

    const verify = verifyToken(authorization);

    if (!verify) {
      failed(res, 401, 'Unauthorized access, invalid token');
    }

    if (verify.role !== 'ADMIN') {
      return failed(res, 401, 'Access denied, you are not an admin');
    }

    req.user = verify.data;

    next();
  } catch (err) {
    failed(res, 500, err.message);
  }
};

module.exports = AuthJwt;
