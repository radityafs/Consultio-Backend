const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync("Rahasia@123", salt);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          userId: "497fce87-e096-4017-ae65-e3a4c1650b25",
          fullname: "Admin",
          email: "admin@gmail.com",
          password,
          roleId: 1,
          token: uuidv4(),
          photo: "default.png",
          isVerified: true,
          isPrivate: true
        },
        {
          userId: "557eb3d0-aa3f-454a-9619-0ab05991a045",
          fullname: "User Satu",
          email: "user1@gmail.com",
          password,
          roleId: 2,
          token: uuidv4(),
          photo: "default.png",
          isVerified: true
        },
        {
          userId: "70400bf7-b62a-4fb1-9293-665a75075042",
          fullname: "User Dua",
          email: "user2@gmail.com",
          password,
          roleId: 2,
          token: uuidv4(),
          photo: "default.png",
          isVerified: true
        },
        {
          userId: "f8fb4ccc-85a5-4db3-92ff-03dd3acecf92",
          fullname: "Simbolon S.H",
          email: "lawyer1@gmail.com",
          password,
          roleId: 3,
          token: uuidv4(),
          photo: "default.png",
          isVerified: true,
          isPrivate: true
        },
        {
          userId: "da5a2ba6-935b-465d-8ddc-87ec0a3aa8e2",
          fullname: "Rizki S.H",
          email: "lawyer2@gmail.com",
          password,
          roleId: 3,
          token: uuidv4(),
          photo: "default.png",
          isVerified: true,
          isPrivate: true
        },
        {
          userId: "b4d1275d-a3d5-4576-8eb4-6bd121213edb",
          fullname: "Dr. Istuhaa",
          email: "health1@gmail.com",
          password,
          roleId: 4,
          token: uuidv4(),
          photo: "default.png",
          isVerified: true,
          isPrivate: true
        },
        {
          userId: "d8b9d26a-67b8-499e-82e0-68176eb12c85",
          fullname: "Dr. Nurul",
          email: "health2@gmail.com",
          password,
          roleId: 4,
          token: uuidv4(),
          photo: "default.png",
          isVerified: true,
          isPrivate: true
        }
      ],
      {
        returning: true
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {
      returning: true
    });
  }
};
