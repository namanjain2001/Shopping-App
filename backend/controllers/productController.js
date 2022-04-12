const asyncHandler = require('express-async-handler');
const Products = require("../models/productModel");

const getProducts = asyncHandler(async (req, res) => {
    const products = await Products.find();
    res.json({ status: true, All_Products: products });
});

const getProduct = asyncHandler(async (req, res) => {

    const product = await Products.findById(req.params.id);

    if (product) {
        //throw new Error("Not found")
        res.json({ status: true, Product: product });
    } else {
        res.status().json({
            status: false,
            message: "Product not found"
        });
    }

});

module.exports = { getProducts, getProduct }