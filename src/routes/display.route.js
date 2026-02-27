import express from "express";
import { getFoodData } from "../controllers/display.controller.js";

const router = express.Router();
router.post("/foodData",getFoodData)

export default router;