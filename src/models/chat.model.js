const { v4: uuidv4 } = require("uuid");

const { db } = require("../config");

module.exports = {
  store: (data) => {
    const messageId = uuidv4();

    const { chatId, sender, receiver, message } = data;

    const query = `INSERT INTO chats (messageId, chatId, sender, receiver, message) VALUES ('${messageId}', '${chatId}','${sender}', '${receiver}', '${message}')`;

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
  list: (data) => {
    const { chatId } = data;

    const query = `
        SELECT 
        chatId,
        sender,
        receiver,
        (SELECT fullname FROM users WHERE users.userId = chats.sender) AS senderName,
        (SELECT fullname FROM users WHERE users.userId = chats.receiver) AS receiverName,
        message

        FROM chats
        WHERE chatId = '${chatId}'
        ORDER BY createdAt ASC
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
  history: (data) => {
    const { userId, consultantId, status } = data;

    const query = `
    SELECT bookings.chatId,
    bookings.bookingId,
    chats.sender,
    chats.receiver,
    (SELECT fullname FROM users WHERE users.userId = chats.sender) AS senderName,
    (SELECT fullname FROM users WHERE users.userId = chats.receiver) AS receiverName,
    (SELECT photo FROM users WHERE users.userId = chats.receiver) AS receiverPhoto,
    (SELECT photo FROM users WHERE users.userId = chats.sender) AS senderPhoto,
    message,
    chats.createdAt as createdAt 
    FROM bookings 
    LEFT JOIN chats ON chats.chatId = bookings.chatId 
    WHERE (bookings.userId = '${userId}' OR bookings.consultantId = '${consultantId}')
    AND bookings.isActive = ${status} ORDER BY chats.createdAt ASC`;

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
