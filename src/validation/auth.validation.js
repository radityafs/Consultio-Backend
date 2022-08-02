const { body } = require('express-validator');

const registerValidation = () => [
  body('name').isLength({ min: 3, max: 16 }).withMessage('invalid name'),
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 8, max: 16 }).withMessage('invalid password')
];

const loginValidation = () => [
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 8, max: 16 }).withMessage('invalid password')
];

const generateTokenValidation = () => [
  body('refreshToken')
    .isLength({ min: 5 })
    .withMessage('refresh token is required')
];

module.exports = {
  registerValidation,
  loginValidation,
  generateTokenValidation
};
