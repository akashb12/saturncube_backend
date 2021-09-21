const express = require("express");
const {
  registerUser,
  loginUser,
  checkAuth,
  updateUser,
  getUsers,
  getUserById,
  uploadImage,
} = require("../controller/userController");
const { catchError } = require("../errors/catchAsync");
const { auth } = require("../middleware/auth");
const router = express.Router();
router.get("/getUsers", catchError(getUsers));
router.get("/getUserById/:id", catchError(getUserById));
router.post("/upload", catchError(uploadImage));
router.post("/register", catchError(registerUser));
router.post("/login", catchError(loginUser));
router.get("/auth", auth, catchError(checkAuth));
router.put("/update/:id", auth, catchError(updateUser));
module.exports = router;
