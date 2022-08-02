const express = require('express');

const router = express.Router();
const {
  register,
  login,
  generateToken
} = require('../controllers/auth.controller');

const {
  loginValidation,
  generateTokenValidation
} = require('../validation/auth.validation');

const { validate, registerValidation } = require('../validation/index');

router
  .post('/register', registerValidation(), validate, register)
  .post('/login', loginValidation(), validate, login)
  .post('/generateToken', generateTokenValidation(), validate, generateToken);

module.exports = router;
