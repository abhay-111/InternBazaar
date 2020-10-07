require("dotenv").config();

const config = {
  apikey: process.env.SENDGRID_API_KEY,
  mongoapikey: process.env.MONGO_API_KEY,
  tokenkey: process.env.TOKEN_KEY,
};

module.exports = config;
