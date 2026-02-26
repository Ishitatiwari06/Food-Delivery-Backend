import {
  createRazorpayOrderService,
  verifyPaymentService,
} from "../services/payment.service.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const order = await createRazorpayOrderService(req.user.id);
    res.json({ order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    await verifyPaymentService(
      req.user.id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    res.json({ message: "Payment successful & order created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};