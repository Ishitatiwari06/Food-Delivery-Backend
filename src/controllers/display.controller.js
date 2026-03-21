import mongoose from "mongoose";

export const getFoodData = async (req, res) => {
    try {
        // Fetch all food items
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        let foodItems = await foodItemsCollection.find({}).toArray();
        // Sanitize CategoryName field for all food items
        foodItems = foodItems.map(item => {
            // Fix field if it is split or has line breaks/typos
            const brokenKey = 'CategoryNa\nme'.replace('\\n', '\n');
            if (!item.CategoryName && (item[brokenKey])) {
                item.CategoryName = item[brokenKey];
                delete item[brokenKey];
            }
            // Remove any accidental whitespace or line breaks
            if (typeof item.CategoryName === "string") {
                item.CategoryName = item.CategoryName.replace(/\s+/g, " ").trim();
            }
            return item;
        });

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
        