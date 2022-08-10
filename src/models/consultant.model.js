const { db } = require('../config');

module.exports = {
  getConsultantList: (data) => {
    const { roleid, city, name } = data;

    const query = `
    SELECT consultants.consultantId, users.fullname,users.photo, users.roleId,users.address, users.city, users.phone,consultants.experience,consultants.isActive 
    FROM consultants LEFT JOIN users ON consultants.userId = users.userId

    ${roleid || city || name ? 'WHERE ' : ''}

    ${roleid ? `users.roleId = ${roleid}` : ''}
    ${roleid && city ? 'AND' : ''}

    ${city ? `users.city = '${city}'` : ''}
    ${(roleid || city) && name ? 'AND' : ''}
    
    ${name ? `users.fullname LIKE '%${name}%'` : ''}
    
    AND consultants.isActive = true
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
  getConsultantDetail: (data) => {
    const { consultantId } = data;

    const query = `SELECT consultants.consultantId, users.fullname,users.photo, users.roleId,users.address, users.city, users.phone,consultants.experience,consultants.isActive 
    FROM consultants LEFT JOIN users ON consultants.userId = users.userId WHERE consultants.consultantId = '${consultantId}'`;

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
  updateConsultantProfile: (data) => {
    const {
      userId,
      consultantId,
      fullname,
      city,
      address,
      phone,
      isActive,
      experience
    } = data;

    const query = `UPDATE users,consultants 

    SET users.fullname = '${fullname}',
    users.city = '${city}',
    users.address = '${address}',
    users.phone = '${phone}',
    consultants.isActive = ${isActive},
    consultants.experience = '${experience}'

    WHERE users.userId = consultants.userId 
    AND consultants.consultantId = '${consultantId}'
    AND users.userId = '${userId}';`;

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

  updateConsultantPhoto: (data) => {
    const { userId, consultantId, photo } = data;

    const query = `
        UPDATE users,consultants 
        SET users.photo = '${photo}'
        WHERE users.userId = consultants.userId 
        AND users.userId = '${userId}' AND consultants.consultantId = '${consultantId}';
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
