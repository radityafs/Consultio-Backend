const { body } = require('express-validator');

const updateProfileValidation = () => [
  body('fullname')
    .isLength({ min: 8, max: 128 })
    .withMessage('invalid fullname'),
  body('city').isLength({ min: 3, max: 128 }).withMessage('invalid city'),
  body('address').isLength({ min: 3, max: 128 }).withMessage('invalid address'),
  body('phone').isLength({ min: 8, max: 16 }).withMessage('invalid phone')
];

module.exports = {
  updateProfileValidation
};
