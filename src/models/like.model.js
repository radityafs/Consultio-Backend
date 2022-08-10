const { db } = require('../config');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  postLike: async (data) => {
    const { postId, userId } = data;
    const likeId = uuidv4();

    const query = `INSERT INTO likes (likeId, postId, userId) VALUES ('${likeId}','${postId}', '${userId}');`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
  destroyLike: async (data) => {
    const { postId, userId } = data;

    const query = `DELETE FROM likes WHERE postId = '${postId}' AND userId = '${userId}';`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
};
