module.exports = class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }
  static notFound(msg) {
    return new ApiError(404, msg);
  }
  static alreadyExist(msg) {
    return new ApiError(409, msg);
  }
  static Unauthorized(msg) {
    return new ApiError(401, msg);
  }

  static internal(msg) {
    return new ApiError(500, msg);
  }
};
