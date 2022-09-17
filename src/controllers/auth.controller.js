const bcrypt = require("bcrypt");
const role = require("../utils/role.users");

const {
  login,
  registerUser,
  registerConsultant
} = require("../models/auth.model");
const { success, failed } = require("../helpers/response");
const {
  createToken,
  createRefreshToken,
  generateRefreshToken
} = require("../helpers/jwt");
const { sendMailVerification } = require("../helpers/emailService");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;

      const user = {
        fullname,
        email,
        password
      };

      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);

      const result = await registerUser(user);
      if (result.result.affectedRows > 0) {
        const payload = {
          userId: result.data.userId,
          role: role(result.data.role),
          fullname: result.data.fullname,
          email: result.data.email,
          photo: result.data.photo,
          address: result.data.address,
          city: result.data.city,
          phone: result.data.phone,
          isVerified: result.data.isVerified,
          isPrivate: result.data.isPrivate
        };

        const token = createToken(payload);
        const refreshToken = createRefreshToken(payload);

        // await sendMailVerification(user.email, result.data.token);

        return success(res, 201, {
          token,
          refreshToken,
          profile: payload
        });
      }

      return failed(res, 400, "Email already registered");
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        return failed(res, 400, "Email already registered");
      }

      return failed(res, 500, {
        message: e.message
      });
    }
  },

  registerConsultant: async (req, res) => {
    try {
      const { fullname, email, password, roleId } = req.body;

      const user = {
        fullname,
        email,
        password,
        roleId
      };

      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);

      const result = await registerConsultant(user);
      if (result.result.affectedRows > 0) {
        const payload = {
          userId: result.data.userId,
          role: role(result.data.roleId),
          fullname: result.data.fullname,
          email: result.data.email,
          photo: result.data.photo,
          address: result.data.address,
          city: result.data.city,
          phone: result.data.phone,
          isVerified: result.data.isVerified,
          isPrivate: result.data.isPrivate
        };

        const token = createToken(payload);
        const refreshToken = createRefreshToken(payload);

        // await sendMailVerification(user.email, result.data.token);

        return success(res, 201, {
          token,
          refreshToken,
          profile: payload
        });
      }

      return failed(res, 400, "Email already registered");
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return failed(res, 400, "Email already registered");
      }

      return failed(res, 500, {
        message: error.message
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await login({ email });

      if (result.length > 0) {
        const isMatch = bcrypt.compareSync(password, result[0].password);

        if (isMatch) {
          const payload = {
            userId: result[0].userId,
            role: role(result[0].roleId),
            fullname: result[0].fullname,
            email: result[0].email,
            photo: result[0].photo,
            address: result[0].address,
            city: result[0].city,
            phone: result[0].phone,
            isVerified: result[0].isVerified,
            isPrivate: result[0].isPrivate
          };
          const token = createToken(payload);
          const refreshToken = createRefreshToken(payload);
          return success(res, 200, {
            token,
            refreshToken,
            profile: payload
          });
        }

        return failed(res, 400, "Email or Password is incorrect");
      }

      return failed(res, 400, "Email or password is incorrect");
    } catch (e) {
      return failed(res, 500, {
        message: e.message
      });
    }
  },
  generateToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;

      const Token = generateRefreshToken(refreshToken);

      if (!Token) {
        return failed(res, 401, "Unauthorized");
      }

      return success(res, 200, {
        token: Token
      });
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  }
};
