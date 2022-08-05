const { db } = require('../config');

module.exports = {
  getTokenVerification: async (data) => {
    const { userId } = data;

    const query = `SELECT token FROM users WHERE userId = '${userId}';`;

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

  updateEmailVerification: async (data) => {
    const { userId, token } = data;

    const query = `UPDATE users SET isVerified = true WHERE userId = '${userId}' AND token = '${token}';`;

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
