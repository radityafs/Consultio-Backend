const { db } = require('../config');

module.exports = {
  register: (data) => {
    const { name, email, password } = data;
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ('${name}','${email}', '${password}')
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

  login: (data) => {
    const { email } = data;

    const query = `
      SELECT * FROM users
      WHERE email = '${email}';`;

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
