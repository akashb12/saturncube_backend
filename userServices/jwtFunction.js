const { sign, verify } = require("jsonwebtoken");
const config = require("../config");
module.exports.createJwt = (email, phone, id) => {
  return sign({ email, phone, id }, config.jwtSecret, { expiresIn: 3600 });
};
module.exports.verifyJwt = (token) => {
  return verify(token, config.jwtSecret);
};
