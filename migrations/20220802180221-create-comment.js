module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
      commentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      postId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      userId: {
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
    await queryInterface.dropTable("comments");
  }
};
