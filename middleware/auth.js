const ApiError = require("../errors/ApiErrors");
const { verifyJwt } = require("../userServices/jwtFunction");

module.exports.auth = async (req, res, next) => {
  const header = req.header("authorization") || "";
  const token = header.split(" ")[1];
  const session = token && (await verifyJwt(token));
  if (!session) {
    next(ApiError.Unauthorized("user is unauthorized"));
  }
  req.userSession = session;
  next();
};
