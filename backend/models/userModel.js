const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hashSync(this.password, 10);
        next();
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;