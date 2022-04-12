const express = require("express");
const router = express.Router();
const { authController, getUserProfile, registerUser, updateUserDetail } = require("../controllers/usersController");
const protect = require("../middlewares/authMiddleware");

// Register User
router.route("/register").post(registerUser);

// Login user
router.route("/login").post(authController);

// User Profile -- Private route
router.route("/profile").get(protect, getUserProfile).patch(protect, updateUserDetail);

module.exports = router;