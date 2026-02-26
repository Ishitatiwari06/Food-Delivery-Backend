import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  try {
    const { order_data, order_date } = req.body;
    if (!order_data || !Array.isArray(order_data) || order_data.length === 0) {
      return res.status(400).json({ message: "Order data is empty" });
    }
    const newOrder = new Order({
      user: req.user.id,
      order_data,
      order_date,
    });
    await newOrder.save();
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};