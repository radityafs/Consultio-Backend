const bcrypt = require('bcrypt');
const role = require('../utils/role.users');

const { register, login } = require('../models/auth.model');
const { success, failed } = require('../helpers/response');
const {
  createToken,
  createRefreshToken,
  generateRefreshToken
} = require('../helpers/jwt');
const { sendMailVerification } = require('../helpers/emailService');

module.exports = {
  register: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      const user = {
        fullname,
        email,
        password
      };

      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);

      const result = await register(user);
      if (result.affectedRows > 0) {
        const payload = {
          userId: result.userId,
          role: role(result.roleId),
          fullname: result.fullname,
          email: result.email,
          photo: result.photo,
          address: result.address,
          city: result.city,
          phone: result.phone,
          isVerified: result.isVerified,
          isPrivate: result.isPrivate
        };

        const token = createToken(user);
        const refreshToken = createRefreshToken(user);

        // send email verification
        await sendMailVerification(user.email, result.token);

        return success(res, 201, {
          token,
          refreshToken,
          profile: payload
        });
      }

      return failed(res, 400, 'Email already registered');
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return failed(res, 400, 'Email already registered');
      }

      return failed(res, 500, {
        message: e.message
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await login({ email, password });

      if (result.length > 0) {
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

      return failed(res, 400, 'Email or password is incorrect');
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
        return failed(res, 401, 'Unauthorized');
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
