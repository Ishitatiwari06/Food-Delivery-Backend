import express from 'express';
import { placeOrder } from '../controllers/order.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
const router = express.Router();
router.post("/orderData", verifyToken, placeOrder);

export default router;