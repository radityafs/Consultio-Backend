const { store, list } = require('../models/chat.model');

module.exports = (io, socket) => {
  socket.on('ping', (data) => {
    socket.emit('ping-response', data);
  });
  socket.on('join-room', async (data) => {
    await socket.join(data.id);
    io.to(data.id).emit('response-join', 'success');
  });
  socket.on('send-message', async (data) => {
    store(data)
      .then(async () => {
        const listChats = await list(data);
        io.to(data.receiver).emit('send-message-response', listChats);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('chat-history', async (data) => {
    const listChats = await list(data);
    io.to(data.sender).emit('send-message-response', listChats);
  });
};
