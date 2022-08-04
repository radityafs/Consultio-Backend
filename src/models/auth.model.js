const { v4: uuidv4 } = require('uuid');

const { db } = require('../config');

module.exports = {
  register: (data) => {
    const { fullname, email, password } = data;

    const id = uuidv4();
    const token = uuidv4();

    const response = {
      userId: id,
      fullname,
      email,
      photo: 'default.png',
      address: '',
      city: '',
      phone: '',
      roleId: 2,
      isVerified: false,
      isPrivate: false
    };

    const query = `INSERT INTO users (userId, fullname,email, password, token, photo, roleId) 
    VALUES ('${id}', '${fullname}', '${email}', '${password}', '${token}', 'default.png', 2)`;

    return new Promise((resolve, reject) => {
      db.query(query, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  },

  login: (data) => {
    const { email } = data;

    const query = `
      SELECT userId, fullname, email,password,photo, address, city, phone,roleId, isVerified, isPrivate 
      FROM users WHERE email = '${email}';`;

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
