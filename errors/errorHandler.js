const ApiError = require("./ApiErrors");
module.exports.apiErrorHandler = (err, req, res, next) => {
  // in prod, don't use console.log or console.err because
  // it is not async

  if (err instanceof ApiError) {
    res.status(err.code).json({ err: err.message });
    return;
  }

  res.status(500).json("something went wrong");
};
