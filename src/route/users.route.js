const express = require('express');
const {
  updateProfile,
  getProfile,
  updatePhotoProfile
} = require('../controllers/users.controller');
const {
  sendVerificationEmail,
  verifyEmail
} = require('../controllers/verification.controller');

const { updateProfileValidation, validate } = require('../validation');

const uploadPhoto = require('../middleware/uploadPhoto.multer');
const isUser = require('../middleware/isUser.jwt');
const AuthJwt = require('../middleware/auth.jwt');

const router = express.Router();

router
  .get('/users/sendVerifyEmail', AuthJwt, sendVerificationEmail)
  .post('/users/verifyEmail', AuthJwt, verifyEmail)
  .get('/users/:id', AuthJwt, getProfile)
  .put('/users/:id', updateProfileValidation(), validate, isUser, updateProfile)
  .put('/users/:id/photo', isUser, uploadPhoto, updatePhotoProfile);

module.exports = router;
