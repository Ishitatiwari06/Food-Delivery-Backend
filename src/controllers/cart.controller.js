import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ user: req.user.id });
    res.json(foundCart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { foodItem, name, price, size, img, quantity = 1 } = req.body;
    let foundCart = await Cart.findOne({ user: req.user.id });
    if (!foundCart) {
      foundCart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }
    const existingItem = foundCart.items.find(
      (item) =>
        item.foodItem.toString() === foodItem &&
        item.size === size
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      foundCart.items.push({
        foodItem,
        name,
        price,
        size,
        img,
        quantity,
      });
    }
    await foundCart.save();
    res.json(foundCart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { foodItem, size, quantity } = req.body;
    const foundCart = await Cart.findOne({ user: req.user.id });
    const item = foundCart.items.find(
      (i) => i.foodItem.toString() === foodItem && i.size === size
    );
    if (item) {
      item.quantity = quantity;
    }
    await foundCart.save();
    res.json(foundCart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { foodItem, size } = req.body;
    const foundCart = await Cart.findOne({ user: req.user.id });
    foundCart.items = foundCart.items.filter(
      (item) => !(item.foodItem.toString() === foodItem && item.size === size)
    );
    await foundCart.save();
    res.json(foundCart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
