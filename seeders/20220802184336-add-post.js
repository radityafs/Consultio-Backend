const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'posts',
      [
        {
          postId: uuidv4(),
          userId: '557eb3d0-aa3f-454a-9619-0ab05991a045',
          story: 'Content 1'
        },
        {
          postId: uuidv4(),
          userId: '557eb3d0-aa3f-454a-9619-0ab05991a045',
          story: 'Content 2'
        },
        {
          postId: uuidv4(),
          userId: '557eb3d0-aa3f-454a-9619-0ab05991a045',
          story: 'Content 3'
        },
        {
          postId: uuidv4(),
          userId: '70400bf7-b62a-4fb1-9293-665a75075042',
          story: 'Content 4'
        },
        {
          postId: uuidv4(),
          userId: '70400bf7-b62a-4fb1-9293-665a75075042',
          story: 'Content 5'
        }
      ],
      {
        returning: true
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('posts', null, {
      returning: true
    });
  }
};
