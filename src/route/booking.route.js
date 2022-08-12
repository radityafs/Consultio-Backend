const express = require('express');
const router = express.Router();
const {
  createBooking,
  updateBooking,
  updateBookingReview,
  getBookingDetail,
  getBooking
} = require('../controllers/booking.controller');
const isUser = require('../middleware/isUser.jwt');
const isConsultant = require('../middleware/isConsultant.jwt');
const AuthJwt = require('../middleware/auth.jwt');
router
  .post('/booking', isUser, createBooking)
  .get('/booking', AuthJwt, getBooking)
  .get('/booking/:id', AuthJwt, getBookingDetail)
  .put('/booking/:id', isConsultant, updateBooking)
  .put('/booking/:id/rating', isUser, updateBookingReview);

module.exports = router;
