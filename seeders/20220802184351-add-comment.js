const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          commentId: uuidv4(),
          userId: '557eb3d0-aa3f-454a-9619-0ab05991a045',
          postId: '2d6254bb-9ca5-4dda-8b29-09e9a48fb516',
          message: 'Comment 1'
        },
        {
          commentId: uuidv4(),
          userId: '557eb3d0-aa3f-454a-9619-0ab05991a045',
          postId: '2d6254bb-9ca5-4dda-8b29-09e9a48fb516',
          message: 'Comment 2'
        },
        {
          commentId: uuidv4(),
          userId: '557eb3d0-aa3f-454a-9619-0ab05991a045',
          postId: '2d6254bb-9ca5-4dda-8b29-09e9a48fb516',
          message: 'Comment 3'
        }
      ],
      {
        returning: true
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
