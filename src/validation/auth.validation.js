const { body } = require('express-validator');

const registerValidation = () => [
  body('fullname')
    .isLength({ min: 8, max: 128 })
    .withMessage('invalid fullname'),
  body('email').isEmail().withMessage('invalid email'),
  body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Please enter a valid password')
];

const loginValidation = () => [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Please enter a valid password')
];

const generateTokenValidation = () => [
  body('refreshToken')
    .isLength({ min: 128, max: 255 })
    .withMessage('invalid refresh token')
];

module.exports = {
  registerValidation,
  loginValidation,
  generateTokenValidation
};
