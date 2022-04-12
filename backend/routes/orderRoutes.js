const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { createOrder, getOrder, myOrders } = require("../controllers/orderController");

// Create Order Route
router.route("/").post(protect, createOrder);

// Get Order
router.route("/:id").get(protect, getOrder);

// My Orders
router.route("/myorders/:id").get(protect, myOrders);

module.exports = router;