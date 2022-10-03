const { db } = require("../config");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getBookingId: async (data) => {
    const { bookingId } = data;

    const query = `SELECT * FROM bookings WHERE bookingId = '${bookingId}';`;

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

  createBooking: async (data) => {
    const { userId, consultantId, consultantUserId, problem, type } = data;

    const bookingId = uuidv4();
    const messageId = uuidv4();
    const chatId = uuidv4();

    const query = `INSERT INTO bookings (bookingId, userId, consultantId, problem, type, isActive, chatId) VALUES ('${bookingId}', '${userId}', '${consultantId}', '${problem}', '${type}', 1, '${chatId}')`;
    const query2 = `INSERT INTO chats (messageId, chatId, sender, receiver, message) VALUES ('${messageId}','${chatId}', '${userId}', '${consultantUserId}', '${problem}')`;

    return new Promise((resolve, reject) => {
      db.query(query, (error) => {
        if (error) {
          reject(error);
        } else {
          db.query(query2, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({ result, data: { bookingId, chatId } });
            }
          });
        }
      });
    });
  },

  updateBooking: async (data) => {
    const { consultantId, bookingId, solution } = data;

    const query = `UPDATE bookings SET solution = '${solution}', isActive = 0 WHERE bookingId = '${bookingId}' AND consultantId = '${consultantId}';`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  updateBookingReview: async (data) => {
    const { userId, bookingId, rating, review } = data;

    const query = `UPDATE bookings SET reviewStar = ${rating}, reviewContent = '${review}', updatedAt = CURRENT_TIMESTAMP WHERE bookingId = '${bookingId}' AND userId = '${userId}';`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  getBookingDetailbyId: async (data) => {
    const { bookingId, userId } = data;

    const query = `SELECT 

    bookingId, 
    (SELECT users.fullname FROM users WHERE bookings.userId = users.userId) AS customerName,
    (SELECT users.fullname FROM users WHERE userId = (SELECT consultants.userId FROM consultants WHERE bookings.consultantId = consultants.consultantId) ) AS consultantName,
    type,
    chatId,
    reviewStar AS rating,
    reviewContent AS review,
    solution,
    isActive,
    updatedAt,
    createdAt
    
    FROM bookings WHERE bookingId = '${bookingId}' AND userId = '${userId}';`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  countBooking: async (data) => {
    const { type, isActive, userId } = data;

    const query = `SELECT COUNT(*) AS count FROM bookings 

    WHERE userId = '${userId}'

    ${type || isActive ? "AND" : ""}
    ${type ? `type = '${type}'` : ""}
    ${type && isActive ? "AND" : ""}
    ${isActive ? `isActive = ${isActive}` : ""}`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result[0].count);
      });
    });
  },

  getBookingList: async (data) => {
    const { userId, offset, limit, type, isActive } = data;

    const query = `
    SELECT 

    bookingId, 
    (SELECT users.fullname FROM users WHERE bookings.userId = users.userId) AS customerName,
    (SELECT users.fullname FROM users WHERE userId = (SELECT consultants.userId FROM consultants WHERE bookings.consultantId = consultants.consultantId) ) AS consultantName,
    (SELECT users.photo FROM users WHERE userId = (SELECT consultants.userId FROM consultants WHERE bookings.consultantId = consultants.consultantId) ) AS consultantPhoto,
    (SELECT users.userId FROM users WHERE userId = (SELECT consultants.userId FROM consultants WHERE bookings.consultantId = consultants.consultantId) ) AS consultantUserId,
    consultantId,
    type,
    chatId,
    reviewStar AS rating,
    reviewContent AS review,
    solution,
    isActive,
    updatedAt,
    createdAt

    FROM bookings

    WHERE userId = '${userId}' OR consultantId = (SELECT consultantId FROM consultants WHERE userId = '${userId}')

    ${type || isActive ? "AND" : ""}
    ${type ? `type = '${type}'` : ""}
    ${isActive ? `isActive = ${isActive}` : ""}
    
    ORDER BY createdAt DESC
    LIMIT ${limit}
    OFFSET ${offset}
    ;`;

    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
};
