const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "consultants",
      [
        {
          consultantId: uuidv4(),
          userId: "b4d1275d-a3d5-4576-8eb4-6bd121213edb",
          type: 4,
          isActive: true,
          experience: 5
        },
        {
          consultantId: uuidv4(),
          userId: "d8b9d26a-67b8-499e-82e0-68176eb12c85",
          type: 4,
          isActive: true,
          experience: 7
        }
      ],
      {
        returning: true
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("consultants", null, {
      returning: true
    });
  }
};
