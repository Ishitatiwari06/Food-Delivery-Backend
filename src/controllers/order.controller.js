import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { getMyOrdersService, placeOrderService } from "../services/order.service.js";
export const placeOrder = async (req, res) => {
  try {
    const newOrder = await placeOrderService(req, res);
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await getMyOrdersService(req, res);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};