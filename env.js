require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,

  DB_HOST: process.env.MYSQL_HOST || 'localhost',
  DB_USER: process.env.MYSQL_USER || 'root',
  DB_PASS: process.env.MYSQL_PASS || '',
  DB_NAME: process.env.MYSQL_DB || 'consultio',

  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '1h',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh',
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || '7d',

  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_PORT: process.env.EMAIL_PORT || 465,
  EMAIL_USER: process.env.EMAIL_USER || 'radityafiqa4@gmail.com',
  EMAIL_PASS: process.env.EMAIL_PASS || 'tcsupnfbrmrqwinq'
};
