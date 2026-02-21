import express from "express";
import { createUser } from "../controllers/auth.controller.js";
import { validateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createuser",validateUser, createUser);

export default router;