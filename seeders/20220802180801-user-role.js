module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("roles", [
      {
        roleId: 1,
        name: "ADMIN"
      },
      {
        roleId: 2,
        name: "USER"
      },
      {
        roleId: 3,
        name: "LAW CONSULTANT"
      },
      {
        roleId: 4,
        name: "HEALTH CONSULTANT"
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", null, {
      returning: true
    });
  }
};
