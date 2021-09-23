const ApiError = require("../errors/ApiErrors");
const { User } = require("../models/UserModel");
const { createJwt } = require("../userServices/jwtFunction");
const { uploadS3 } = require("../userServices/multer");

// upload image
module.exports.uploadImage = async (req, res, next) => {
  uploadS3(req, res, async (err) => {
    if (err) {
      res.json({ err });
    }
    res.json({ data: res.req?.file.location });
  });
};
// register
module.exports.registerUser = async (req, res, next) => {
  const data = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    profile_pic: req.body.profile,
    dob: req.body.dob,
    doj: req.body.doj,
  };
  const check = await User.findOne({ email: req.body.email });
  if (check) {
    next(ApiError.alreadyExist("user already exist"));
    return;
  }
  const addUser = await new User(data).save();
  res.status(201).json({ data: addUser });
};

// login
module.exports.loginUser = async (req, res, next) => {
  const check = await User.findOne({ email: req.body.email });
  if (!check) {
    next(ApiError.notFound("user not found"));
    return;
  }
  const match = await check.comparePassword(req.body.password);
  if (!match) {
    next(ApiError.Unauthorized("password is not correct"));
    return;
  }
  const jwt = createJwt(check.email, check.phone, check._id);
  check.password = "";
  res.cookie("token", jwt, { httpOnly: false, secure: true, sameSite: "none" });
  res.status(200).json({ data: check, token: jwt });
};

// check auth
module.exports.checkAuth = async (req, res, next) => {
  res.json({ data: req.userSession, auth: true });
};

// update user
module.exports.updateUser = async (req, res) => {
  const data = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    profile_pic: req.body.profile,
    dob: req.body.dob,
    doj: req.body.doj,
  };
  const updateEmployee = await User.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { new: true }
  );
  res.status(202).json({ data: updateEmployee });
};

// get all users
module.exports.getUsers = async (req, res) => {
  const getAllEmployees = await User.find();
  res.status(200).json({ data: getAllEmployees });
};

// get user by id
module.exports.getUserById = async (req, res, next) => {
  const getSingleEmployee = await User.findById(req.params.id);
  if (!getSingleEmployee) {
    next(ApiError.notFound("employee not found"));
  }
  res.json({ data: getSingleEmployee });
};

// logout
module.exports.logout = async (req, res, next) => {
  res.cookie("token", "", { httpOnly: false, secure: true, sameSite: "none" });
  res.json({ data: "logout" });
};
