import { verifySignupOtp } from "../controllers/auth.controller.js";
import express from "express";
import { createUser, loginUser } from "../controllers/auth.controller.js";
import { validateUser, validateLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createuser", validateUser, createUser);
router.post("/login", validateLogin, loginUser);
router.post("/verify-otp", verifySignupOtp);

export default router;