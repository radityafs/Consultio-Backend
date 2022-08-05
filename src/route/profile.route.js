const express = require('express');
const { updateProfile } = require('../controllers/profile.controller');
const AuthJwt = require('../middleware/auth.jwt');
const { updateProfileValidation, validate } = require('../validation');
const uploadPhoto = require('../middleware/uploadPhoto.multer');

const router = express.Router();

router
  .post(
    '/users/updateProfile',
    updateProfileValidation(),
    validate,
    AuthJwt,
    updateProfile
  )
  .post('/users/updatePhoto', AuthJwt, uploadPhoto, updateProfile)
  .get('/users/:id');

module.exports = router;
