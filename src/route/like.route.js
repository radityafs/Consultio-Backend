const express = require('express');
const { postLike, destroyLike } = require('../controllers/like.controller');
const AuthJwt = require('../middleware/auth.jwt');

const router = express.Router();

router
  .post('/like/:id', AuthJwt, postLike)
  .delete('/like/:id', AuthJwt, destroyLike);

module.exports = router;
