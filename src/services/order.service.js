import Order from "../models/Order.js";

export const getMyOrdersService = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ order_date: -1 });
        return orders;
    } catch (err) {
        throw new Error("Server error");
    }
};

export const placeOrderService = async (req, res) => {
    try {
        const { order_data, order_date } = req.body;
        if (!order_data || !Array.isArray(order_data) || order_data.length === 0) {
            throw new Error("Order data is empty");
        }
        const newOrder = new Order({
            user: req.user.id,
            order_data,
            order_date,
        });
        await newOrder.save();
        return newOrder;
    } catch (err) {
        throw new Error("Server error");
    }
};
