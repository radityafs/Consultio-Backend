const express = require('express');
const {
  getComment,
  postComment
} = require('../controllers/comment.controller');
const AuthJwt = require('../middleware/auth.jwt');

const router = express.Router();

router
  .get('/comments/:id', AuthJwt, getComment)
  .post('/comments/:id', AuthJwt, postComment);

module.exports = router;
