import mongoose from "mongoose";

export const getFoodData = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetch paginated food items
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const total = await foodItemsCollection.countDocuments();
        const foodItems = await foodItemsCollection.find({})
            .skip(skip)
            .limit(limit)
            .toArray();

        // Fetch all categories (not paginated)
        const foodCategory = await mongoose.connection.db
            .collection("foodCategory")
            .find({})
            .toArray();

        res.json({
            foodItems,
            foodCategory,
            total,
            page,
            limit
        });
    } catch (error) {
        console.error("Error fetching food data:", error.message);
        res.status(500).json({ error: "Failed to fetch food data" });
    }
}
        