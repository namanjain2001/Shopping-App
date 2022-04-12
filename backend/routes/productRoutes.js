const express = require("express");
const router = express.Router();
const { getProduct, getProducts } = require("../controllers/productController");

router.route('/products').get(getProducts);

router.route("/product/:id").get(getProduct);

module.exports = router;