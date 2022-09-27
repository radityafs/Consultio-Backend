const { store, history, list } = require("../models/chat.model");

module.exports = (io, socket) => {
  socket.on("ping", (data) => {
    socket.emit("ping-response", data);
  });

  socket.on("join-room", async (data) => {
    const { userId } = data;
    await socket.join(userId);
    io.to(userId).emit("join-room-response", { message: "success" });
  });

  socket.on("send-message", async (data) => {
    const { chatId, sender, receiver, message } = data;
    try {
      const result = await store({ chatId, sender, receiver, message });
      if (result) {
        io.to(receiver).emit("message-log", data);
      } else {
        io.to(receiver).emit("message-log", { ...data, message: "failed" });
      }
    } catch (error) {
      io.to(receiver).emit("error-log", { error: error.message });
    }
  });

  socket.on("chat-history", async (data) => {
    try {
      const { status, userId, consultantId } = data;
      const getChatHistory = await history({ userId, consultantId, status });
      if (getChatHistory) {
        io.to(userId).emit("message-history", getChatHistory);
      } else {
        io.to(userId).emit("message-history", { ...data, message: "failed" });
      }
    } catch (error) {
      io.to(userId).emit("error-log", { error: error.message });
    }
  });

  socket.on("chat-detail", async (data) => {
    try {
      const { userId, chatId } = data;
      const listChats = await list(chatId);
      if (listChats) {
        io.to(userId).emit("message-detail", listChats);
      } else {
        io.to(userId).emit("message-detail", { ...data, message: "failed" });
      }
    } catch (error) {
      io.to(userId).emit("error-log", { error: error.message });
    }
  });
};
