module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      postId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      story: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isAnonymous: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      attachmentId: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable("posts");
  }
};
