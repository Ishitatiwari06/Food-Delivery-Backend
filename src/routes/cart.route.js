import express from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateQuantity);
router.delete("/remove", verifyToken, removeFromCart);

export default router;