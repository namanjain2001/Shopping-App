var bcrypt = require('bcryptjs');

const Users = [
    {
        name: "Naman Jain",
        email: "naman@test.com",
        password: bcrypt.hashSync("naman", 10),
        isAdmin: true
    },
    {
        name: "Test User 1",
        email: "test@test.com",
        password: bcrypt.hashSync("test", 10)
    },
    {
        name: "Test User 2",
        email: "test2@test.com",
        password: bcrypt.hashSync("test2", 10)
    }
]

module.exports = Users;