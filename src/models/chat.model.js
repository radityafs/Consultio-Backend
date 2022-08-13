const { db } = require('../config');

module.exports = {
  store: (data) => {
    const { sender, receiver, message } = data;

    const query = `INSERT INTO chats (sender, receiver, message) VALUES ('${sender}', '${receiver}', '${message}')`;

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
    const { sender, receiver } = data;

    const query = `
        SELECT 
        chatId,
        sender,
        receiver,
        (SELECT fullname FROM users WHERE users.userId = chats.sender) AS senderName,
        (SELECT fullname FROM users WHERE users.userId = chats.receiver) AS receiverName,
        message

        FROM chats
        WHERE (sender = '${sender}' AND receiver = '${receiver}') OR (sender = '${receiver}' AND receiver = '${sender}')
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
  }
};
