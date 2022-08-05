const express = require('express');
const {
  sendVerificationEmail,
  verifyEmail
} = require('../controllers/verify.controller');
const AuthJwt = require('../middleware/auth.jwt');

const router = express.Router();

router
  .get('/sendVerifyEmail', AuthJwt, sendVerificationEmail)
  .post('/verifyEmail', AuthJwt, verifyEmail);

module.exports = router;
