const { db } = require('../config');

module.exports = {
  getProfile: async (data) => {
    const { userId } = data;

    const query = `SELECT * FROM users WHERE userId = '${userId}';`;

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
  updateProfile: async (data) => {
    const { userId, fullname, city, address, phone } = data;

    const query = `
        UPDATE users SET fullname = '${fullname}', city = '${city}', address = '${address}', phone = '${phone}'
        WHERE userId = '${userId}';
    `;

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
  updatePhotoProfile: async (data) => {
    const { userId, photo } = data;

    const query = `
        UPDATE users SET photo = '${photo}'
        WHERE userId = '${userId}';
    `;

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
