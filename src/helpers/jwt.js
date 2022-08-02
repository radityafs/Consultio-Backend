const jwt = require('jsonwebtoken');

const {
  JWT_SECRET,
  JWT_EXPIRES,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES
} = require('../../env');

const createToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES
  });
};

const createRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES
  });
};

const verifyToken = (token) => {
  const verify = jwt.verify(token, JWT_SECRET);
  if (!verify) {
    return false;
  }
  return true;
};

const generateRefreshToken = (token) => {
  const verify = jwt.verify(token, JWT_REFRESH_SECRET);
  if (!verify) {
    return false;
  }

  return createToken({ id: verify.id, email: verify.email, name: verify.name });
};

module.exports = {
  createRefreshToken,
  createToken,
  verifyToken,
  generateRefreshToken
};
