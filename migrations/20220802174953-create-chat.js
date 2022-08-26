module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("chats", {
      chatId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      sender: {
        type: Sequelize.UUID,
        allowNull: false
      },
      receiver: {
        type: Sequelize.UUID,
        allowNull: false
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("chats");
  }
};
