import express from "express";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import displayRoutes from "./routes/display.route.js";
import cartRoutes from "./routes/cart.route.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}),
); //Required for frontend-backend communication

app.use(express.urlencoded({ extended: true, limit: "10mb" })); //it allows server to read data from req. Without this req.body will be undefined
app.use("/api", authRoutes);
app.use("/api", displayRoutes);
app.use("/api/cart", cartRoutes);
export default app;