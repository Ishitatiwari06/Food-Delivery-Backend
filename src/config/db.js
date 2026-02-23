import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
       const foodItems = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();

    const foodCategory = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();

    global.food_items = foodItems;
    global.foodCategory = foodCategory;

    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};
export default connectDB;