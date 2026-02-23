export const getFoodData = async (req, res) => {
    try {
        res.send([global.food_items,global.foodCategory]);
    }
    catch (error) {
        console.error("Error fetching food data:", error.message);
    }
}
        