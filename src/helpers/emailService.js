/* eslint-disable arrow-body-style */
const transporter = require('../config/email');
const { EMAIL_USER } = require('../../env');

module.exports = {
  sendMailVerification: (email, token) => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: `"${EMAIL_USER}" <${EMAIL_USER}>`,
        to: email,
        subject: 'Consultio - Email Verification ✔',
        html: `<p>Please click the link below to verify your email</p>
          <a href="http://localhost:3000/verify/${token}">Verify</a>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
};
