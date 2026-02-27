import mongoose from "mongoose";


const orderItemSchema = new mongoose.Schema({
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
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_data: [orderItemSchema],
    order_date: {
      type: String,
      required: false,
    },
    totalAmount: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      default: "Processing",
    },
  }
);

export default mongoose.model("Order", orderSchema);