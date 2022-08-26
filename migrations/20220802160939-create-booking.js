module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      bookingId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      chatId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      reviewStar: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      reviewContent: {
        type: Sequelize.STRING,
        allowNull: true
      },
      problem: {
        type: Sequelize.STRING,
        allowNull: true
      },
      solution: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable("bookings");
  }
};
