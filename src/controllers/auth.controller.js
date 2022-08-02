const bcrypt = require('bcrypt');

const { register, login } = require('../models/auth.model');
const { success, failed } = require('../helpers/response');
const {
  createToken,
  createRefreshToken,
  generateRefreshToken
} = require('../helpers/jwt');

module.exports = {
  register: (req, res) => {
    const { name, email, password } = req.body;
    const user = {
      name,
      email,
      password
    };

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    register(user)
      .then((data) => {
        const payload = {
          id: data.insertId,
          email: user.email,
          name: user.name
        };
        success(res, 201, {
          token: createToken(payload),
          refreshToken: createRefreshToken(payload),
          message: 'Successfully registered'
        });
      })
      .catch((err) => failed(res, 500, err.message));
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
            id: data[0].id,
            email,
            name: data[0].name
          };

          return success(res, 200, {
            token: createToken(payload),
            refreshToken: createRefreshToken(payload)
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
