const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    numOfReviews: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;