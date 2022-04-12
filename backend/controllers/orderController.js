const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");

const createOrder = asyncHandler(async (req, res) => {

    const { user, orderItems, shippingAddress, shippingPrice, totalPrice, payment, paymentResult, isPaid, paidAt } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(404).json({
            status: false,
            message: "No Order Found"
        })
    } else {
        const order = new Order({
            user,
            orderItems,
            shippingAddress,
            payment,
            paymentResult,
            isPaid,
            paidAt,
            shippingPrice,
            totalPrice,
        });

        const newOrder = await order.save();
        res.json({
            status: true,
            orderInfo: newOrder
        });
    }

});

const getOrder = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) {
        res.json({
            status: true,
            orderInfo: order
        })
    } else {
        res.status(404).json({
            status: false,
            message: "No Order Found"
        })
    }

});

const myOrders = asyncHandler(async (req, res) => {

    const order = await Order.find({ user: req.params.id });

    if (order && order.length >= 1) {
        res.json({
            status: true,
            orderInfo: order
        })
    } else {
        res.status(404).json({
            status: false,
            message: "No Orders Found"
        })
    }
});

module.exports = { createOrder, getOrder, myOrders };