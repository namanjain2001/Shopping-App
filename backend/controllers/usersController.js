const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(401).json({
            status: false,
            message: "User already exist! This email was already in use."
        });
    }
    const user = await User.create({ name, email, password });
    if (user) {
        res.json({
            status: true,
            message: "Account has been created",
            //user_details: user,
            user_details: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }
        });
    } else {
        res.status(401).json({
            status: false,
            message: "Something went wrong. Please try again"
        });
    }
});

const authController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            status: true,
            user_details: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }
        });
    } else {
        res.status(401).json({
            status: false,
            message: "Email or Password is incorrect."
        })
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    res.json({
        status: true,
        user_details: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }
    });
});

const updateUserDetail = asyncHandler(async (req, res) => {

    const user = await User.findById(req.body._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
    } else {
        res.status(401).json({
            status: false,
            message: "User not found"
        })
    }

    const updateUser = await user.save();

    if (updateUser) {
        res.json({
            status: true,
            user_details: {
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                token: generateToken(updateUser._id)
            },
            message: "Details has been updated"
        });
    }

});

module.exports = { authController, getUserProfile, registerUser, updateUserDetail };