import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                foodItem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "food_items",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                size: {
                    type: String,
                    required: true,
                },
                img: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);