const express = require('express');
const uploadPhoto = require('../middleware/uploadPhoto.multer');

const {
  getConsultantList,
  getConsultantDetail,
  updateConsultantProfile,
  updateConsultantPhotoProfile
} = require('../controllers/consultant.controller');
const AuthJwt = require('../middleware/auth.jwt');
const isConsultant = require('../middleware/isConsultant.jwt');

const router = express.Router();

router
  .get('/consultant', AuthJwt, getConsultantList)
  .get('/consultant/:id', AuthJwt, getConsultantDetail)
  .put('/consultant/:id', isConsultant, updateConsultantProfile)
  .put(
    '/consultant/:id/photo',
    isConsultant,
    uploadPhoto,
    updateConsultantPhotoProfile
  );

module.exports = router;
