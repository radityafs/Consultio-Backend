const { sendMailVerification } = require('../helpers/emailService');
const { success, failed } = require('../helpers/response');
const {
  getTokenVerification,
  updateEmailVerification
} = require('../models/verification.model');

module.exports = {
  sendVerificationEmail: async (req, res) => {
    try {
      const { email, userId } = req.userData;
      const result = await getTokenVerification({ userId });

      if (result.affectedRows > 0) {
        await sendMailVerification(email, result[0].token);

        return success(res, 200, {
          message: 'Successfully sent verification email'
        });
      }

      return failed(res, 400, 'Failed to send verification email');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const { token } = req.params;
      const { userId } = req.userData;

      const result = await updateEmailVerification({ token, userId });

      if (result.affectedRows > 0) {
        return success(res, 200, {
          message: 'Successfully verified email'
        });
      }

      return failed(res, 400, 'Failed to verify email');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  }
};
