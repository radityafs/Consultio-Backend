const { v4: uuidv4 } = require("uuid");

const { db } = require("../config");

module.exports = {
  registerUser: (data) => {
    const { fullname, email, password } = data;

    const id = uuidv4();
    const token = uuidv4();

    const response = {
      userId: id,
      fullname,
      email,
      photo: "default.png",
      address: "",
      city: "",
      phone: "",
      roleId: 2,
      isVerified: false,
      isPrivate: false,
      token
    };

    const query = `INSERT INTO users (userId, fullname,email, password, token, photo, roleId) VALUES ('${id}', '${fullname}', '${email}', '${password}', '${token}', 'default.png', 2)`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ result, data: response });
        }
      });
    });
  },

  registerConsultant: (data) => {
    const { fullname, email, password, roleId } = data;

    const id = uuidv4();
    const token = uuidv4();
    const consultantId = uuidv4();

    const response = {
      userId: id,
      consultantId,
      fullname,
      email,
      photo: "default.png",
      address: "",
      city: "",
      phone: "",
      roleId,
      isActive: true
    };

    const query = `INSERT INTO users (userId, fullname,email, password, token, photo, roleId,isVerified) VALUES ('${id}', '${fullname}', '${email}', '${password}', '${token}', 'default.png', ${roleId},true)`;
    const query2 = `INSERT INTO consultants (consultantId,userId,type,isActive,experience) VALUES ('${consultantId}','${id}',${roleId},true,0)`;

    return new Promise((resolve, reject) => {
      db.query(query, (errorQuery1) => {
        if (errorQuery1) {
          reject(errorQuery1);
        } else {
          db.query(query2, (errorQuery2, result) => {
            if (errorQuery2) {
              reject(errorQuery2);
            } else {
              resolve({ result, data: response });
            }
          });
        }
      });
    });
  },

  login: (data) => {
    const { email } = data;

    const query = `
      SELECT userId, fullname, email,password,photo, address, city, phone, roleId, isVerified, isPrivate, 
      (SELECT consultantId FROM consultants WHERE userId = users.userId) AS consultantId
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
