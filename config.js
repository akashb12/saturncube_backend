const dotenv = require("dotenv");
dotenv.config();
const config = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: 4000,
  accessKey: process.env.ACCESS_KEY,
  secretKey: process.env.SECRET_KEY,
};
module.exports = config;
