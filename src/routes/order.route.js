import express from 'express';
import { placeOrder,getMyOrders } from '../controllers/order.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post("/orderData", verifyToken, placeOrder);
router.get("/myorders", verifyToken, getMyOrders);
export default router;