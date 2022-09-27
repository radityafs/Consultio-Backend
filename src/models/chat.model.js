const { db } = require("../config");

module.exports = {
  store: (data) => {
    const { chatId, sender, receiver, message } = data;

    const query = `INSERT INTO chats (chatId, sender, receiver, message) VALUES ('${chatId}','${sender}', '${receiver}', '${message}')`;

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
    SELECT 

    chatId,
    sender,
    receiver,
    (SELECT fullname FROM users WHERE users.userId = chats.sender) AS senderName,
    (SELECT fullname FROM users WHERE users.userId = chats.receiver) AS receiverName,
    message
    FROM chats

    WHERE chatId = '(SELECT chatId FROM bookings WHERE userId = '${userId} OR consultantId = '${consultantId}' AND isActive = ${status}) AS chatId' 
    LIMIT 1 BY chatId
    ORDER BY createdAt ASC
    `;

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
