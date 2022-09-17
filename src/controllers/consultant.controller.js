const { success, failed } = require("../helpers/response");
const {
  getConsultantList,
  getConsultantDetail,
  updateConsultantProfile,
  updateConsultantPhoto
} = require("../models/consultant.model");
const fs = require("fs");

module.exports = {
  getConsultantList: async (req, res) => {
    try {
      let { roleid, city, name } = req.query;

      const result = await getConsultantList({ roleid, city, name });

      if (result.length > 0) {
        return success(res, 200, {
          data: result
        });
      }

      return failed(res, 400, "No data found");
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },
  getConsultantDetail: async (req, res) => {
    try {
      let { id } = req.params;

      const result = await getConsultantDetail({ consultantId: id });

      if (result.length > 0) {
        return success(res, 200, {
          data: result
        });
      }

      return failed(res, 400, "No data found");
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },

  updateConsultantProfile: async (req, res) => {
    try {
      let { userId } = req.userData;
      let { id } = req.params;
      let { fullname, city, address, phone, experience, isActive } = req.body;

      const result = await updateConsultantProfile({
        userId,
        consultantId: id,
        fullname,
        city,
        address,
        phone,
        experience,
        isActive
      });

      if (result.affectedRows > 0) {
        return success(res, 200, {
          message: "Successfully updated profile"
        });
      }

      return failed(res, 400, "Failed to update profile");
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },

  updateConsultantPhotoProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await getConsultantDetail({ consultantId: id });

      if (profile.length === 0) {
        return failed(res, 400, "Consultant not found");
      }

      if (profile[0].userId !== req.userData.userId) {
        return failed(
          res,
          400,
          "You are not authorized to update this profile"
        );
      }

      const { photo } = profile[0];

      if (photo !== "default.png") {
        fs.unlinkSync(`./public/${photo}`);
      }

      const result = await updateConsultantPhoto({
        consultantId: id,
        userId: req.userData.userId,
        photo: req.file.filename
      });

      if (result.affectedRows > 0) {
        return success(res, 200, {
          message: "Profile photo updated"
        });
      }

      return failed(res, 400, "failed to update profile photo");
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  }
};
