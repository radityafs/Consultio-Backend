const express = require('express');

const router = express.Router();

const {
  registerUser,
  registerConsultant,
  login,
  generateToken
} = require('../controllers/auth.controller');

const {
  loginValidation,
  generateTokenValidation,
  registerValidation,
  registerConsultantValidation
} = require('../validation/auth.validation');

const { validate } = require('../validation/index');

router
  .post('/register/user', registerValidation(), validate, registerUser)
  .post(
    '/register/consultant',
    registerConsultantValidation(),
    validate,
    registerConsultant
  )
  .post('/login', loginValidation(), validate, login)
  .post('/generateToken', generateTokenValidation(), validate, generateToken);

module.exports = router;
