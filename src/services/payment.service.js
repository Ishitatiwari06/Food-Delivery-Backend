import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const createRazorpayOrderService = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const totalAmount = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const order = await razorpay.orders.create({
    amount: totalAmount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return order;
};

export const verifyPaymentService = async (
  userId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) => {
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new Error("Payment verification failed");
  }

  const cart = await Cart.findOne({ user: userId });

  const totalAmount = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await Order.create({
    user: userId,
    order_data: cart.items,
    order_date: new Date().toDateString(),
    totalAmount,
    status: "Paid",
  });

  cart.items = [];
  await cart.save();

  return true;
};