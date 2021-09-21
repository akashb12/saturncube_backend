const { User } = require("../models/UserModel");

module.exports.skipPassword = User.aggregate([
  {
    $lookup: {
      from: "employees",
      localField: "_id",
      foreignField: "user_id",
      as: "employees",
    },
  },
  { $unwind: "$employees" },
]);
