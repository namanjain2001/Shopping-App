const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(user);
            next();
        } catch (error) {
            res.status(401).json({
                status: false,
                message: "Authorization failed! User not found."
            });
        }
    } else {
        res.status(401).json({
            status: false,
            message: "Authorization failed! Token not found."
        });
    }
});

module.exports = protect;