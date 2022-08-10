const jwt = require('jsonwebtoken');

const {
  JWT_SECRET,
  JWT_EXPIRES,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES
} = require('../../env');

const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES
  });
};

const verifyToken = (token) => {
  const verify = jwt.verify(token, JWT_SECRET);
  if (!verify) {
    return false;
  }
  return verify;
};

const generateRefreshToken = (token) => {
  const verify = jwt.verify(token, JWT_REFRESH_SECRET);
  if (!verify) {
    return false;
  }

  delete verify.exp;

  return createToken(verify);
};

module.exports = {
  createRefreshToken,
  createToken,
  verifyToken,
  generateRefreshToken
};
