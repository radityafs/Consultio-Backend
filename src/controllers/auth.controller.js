const bcrypt = require('bcrypt');
const role = require('../utils/role.users');

const { register, login } = require('../models/auth.model');
const { success, failed } = require('../helpers/response');
const {
  createToken,
  createRefreshToken,
  generateRefreshToken
} = require('../helpers/jwt');

module.exports = {
  register: (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      const user = {
        fullname,
        email,
        password
      };

      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);

      register(user)
        .then((result) => {
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

          const token = createToken(payload);
          const refreshToken = createRefreshToken(payload);

          const data = {
            token,
            refreshToken,
            profile: payload
          };

          success(res, 201, data);
        })
        .catch((err) => {
          if (err.code === 'ER_DUP_ENTRY') {
            failed(res, 500, 'Email already exists');
            return;
          }

          failed(res, 500, err.message);
        });
    } catch (error) {
      failed(res, 500, error.message);
    }
  },
  login: (req, res) => {
    const { email, password } = req.body;
    const user = {
      email,
      password
    };

    login(user).then((data) => {
      if (data.length > 0) {
        const compare = bcrypt.compareSync(password, data[0].password);

        if (compare) {
          const payload = {
            userId: data[0].userId,
            role: role(data[0].roleId),
            fullname: data[0].fullname,
            email: data[0].email,
            photo: data[0].photo,
            address: data[0].address,
            city: data[0].city,
            phone: data[0].phone,
            isVerified: data[0].isVerified,
            isPrivate: data[0].isPrivate
          };

          return success(res, 200, {
            token: createToken(payload),
            refreshToken: createRefreshToken(payload),
            profile: payload
          });
        }

        return failed(res, 401, 'Wrong email or password');
      }
      return failed(res, 401, 'Wrong email or password');
    });
  },
  generateToken: (req, res) => {
    const { refreshToken } = req.body;

    const Token = generateRefreshToken(refreshToken);
    if (!Token) {
      return failed(res, 401, 'Unauthorized');
    }

    return success(res, 200, {
      token: Token
    });
  }
};
