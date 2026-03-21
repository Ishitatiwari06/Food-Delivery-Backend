import mongoose from "mongoose";

export const getFoodData = async (req, res) => {
    try {
        // Fetch all food items
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const foodItems = await foodItemsCollection.find({}).toArray();

        // Fetch all categories
        const foodCategory = await mongoose.connection.db
            .collection("foodCategory")
            .find({})
            .toArray();

        res.json({
            foodItems,
            foodCategory
        });
    } catch (error) {
        console.error("Error fetching food data:", error.message);
        res.status(500).json({ error: "Failed to fetch food data" });
    }
}
        