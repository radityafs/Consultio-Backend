const { success, failed } = require('../helpers/response');
const { updateProfile } = require('../models/profile.model');

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
  updatePhotoProfile: async (req, res) => {
    try {
      const { photo } = req.body;

      const result = await updateProfile({
        userId: req.userData.userId,
        photo
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
