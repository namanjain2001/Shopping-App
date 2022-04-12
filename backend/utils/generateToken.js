const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign(id.toString(), process.env.JWT_SECRET_KEY);
};

module.exports = generateToken;