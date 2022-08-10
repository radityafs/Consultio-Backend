const express = require('express');
const {
  getPost,
  createPost,
  getDetailPost
} = require('../controllers/post.controller');
const AuthJwt = require('../middleware/auth.jwt');
const uploadPhoto = require('../middleware/uploadPhoto.multer');

const router = express.Router();

router
  .get('/posts', AuthJwt, getPost)
  .post('/posts', AuthJwt, uploadPhoto, createPost)
  .get('/posts/:id', AuthJwt, getDetailPost);

module.exports = router;
