const { db } = require('../config');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  getCountCommentByPostId: async (data) => {
    const { postId } = data;

    const query = `SELECT COUNT(*) AS count FROM comments WHERE postId = '${postId}';`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result[0].count);
        }
      });
    });
  },

  getCommentByPostId: async (data) => {
    const { postId, offset, limit } = data;

    const query = `SELECT users.userId, 
    users.fullname, 
    users.photo,
    users.roleId, 
    comments.message, 
    comments.createdAt
    FROM comments LEFT JOIN users ON comments.userId = users.userId WHERE postId = '${postId}'
    ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset};`;

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

  postComment: async (data) => {
    const { postId, userId, message } = data;
    const commentId = uuidv4();

    const query = `INSERT INTO comments (commentId, postId, userId, message) VALUES ('${commentId}','${postId}', '${userId}', '${message}');`;

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
