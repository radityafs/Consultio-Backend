// const { store, list } = require('../models/chat.model');

module.exports = (io, socket) => {
  socket.on('ping', (data) => {
    socket.emit('ping-response', data);
  });
  socket.on('join-room', (data) => {
    socket.join(data.id);
  });
  //   socket.on('send-message', (data) => {
  //     store(data)
  //       .then(async () => {
  //         const listChats = await list(data.sender, data.receiver);
  //         io.to(data.receiver).emit('send-message-response', listChats.rows);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  //   socket.on('delete-message', (data) => {
  //     destroy(data.id)
  //       .then(async () => {
  //         const listChats = await list(data.sender, data.receiver);
  //         io.to(data.receiver).emit('send-message-response', listChats.rows);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  //   socket.on('chat-history', async (data) => {
  //     const listChats = await list(data.sender, data.receiver);
  //     io.to(data.sender).emit('send-message-response', listChats.rows);
  //   });
};
