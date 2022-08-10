const fs = require('fs');
const { success, failed } = require('../helpers/response');
const {
  updateProfile,
  getProfile,
  updatePhotoProfile
} = require('../models/users.model');
const role = require('../utils/role.users');

module.exports = {
  updateProfile: async (req, res) => {
    try {
      const { fullname, city, address, phone } = req.body;

      const result = await updateProfile({
        userId: req.userData.userId,
        fullname,
        city,
        address,
        phone
      });

      if (result.affectedRows > 0) {
        return success(res, 200, {
          message: 'Successfully updated profile'
        });
      }

      return failed(res, 400, 'Failed to update profile');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },

  getProfile: async (req, res) => {
    try {
      const { userId } = req.userData;

      const result = await getProfile({ userId });

      if (result.length > 0) {
        delete result[0].password;
        delete result[0].token;
        result[0].role = role(result[0].role);

        delete result[0].roleId;

        return success(res, 200, {
          profile: result[0]
        });
      }

      return failed(res, 400, 'Failed to get profile');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },
  updatePhotoProfile: async (req, res) => {
    try {
      const profile = await getProfile({ userId: req.userData.userId });
      const { photo } = profile[0];

      if (photo !== 'default.png') {
        fs.unlinkSync(`./public/${photo}`);
      }

      const result = await updatePhotoProfile({
        userId: req.userData.userId,
        photo: req.file.filename
      });

      if (result.affectedRows > 0) {
        return success(res, 200, {
          message: 'Profile photo updated'
        });
      }

      return failed(res, 400, 'failed to update profile photo');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  }
};
