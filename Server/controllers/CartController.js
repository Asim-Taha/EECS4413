import dotenv from "dotenv";
import mongoose from "mongoose";
import Cart from "../models/Cart.js"

dotenv.config();

const getItems = async (req, res, next) => {
  try {
    const itemCart = await Cart.findOne().populate("items.product");
    if (!itemCart) return res.status(404).json({ status: "error", message: "No cart found" });
    res.status(200).json({ status: "successful", data: { itemCart } });
  } catch (err) {
    console.error("Get Cart error: ", err);
    next(err);
  }
};

const addItem = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { productId, quantity } = req.body;
    let itemCart = await Cart.findOne();
    if (!itemCart) {
      itemCart = new Cart({ items: [{ product: productId, quantity }] });
      await itemCart.save({ session });
    } else {
      // Check if product already exists in the cart
      const itemIndex = itemCart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        // If product exists, increase quantity
        itemCart.items[itemIndex].quantity += quantity;
      } else {
        // If product does not exist, add new item
        itemCart.items.push({ product: productId, quantity });
      }
      await itemCart.save({ session });
    }
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ status: "successful", message: "Item has been added to your cart", data: { itemCart } });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Add Item to Cart error: ", err);
    next(err);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    let itemCart = await Cart.findOne();
    if (!itemCart) return res.status(404).json({ status: "error", message: "No cart found" });
    itemCart.items = itemCart.items.filter(item => item._id.toString() !== itemId);
    await itemCart.save();
    res.status(200).json({ status: "successful", message: "Item has been removed from the cart", data: { itemCart } });
  } catch (err) {
    console.error("Remove Item from Cart error: ", err);
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { itemId, quantity } = req.body; 
    let cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ status: "error", message: "No cart found" });
    const item = cart.items.find(item => item._id.toString() === itemId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.status(200).json({ status: "successful", message: "Cart updated successfully", data: { cart } });
    } else {
      throw new Error("Unable to retrieve item from the cart");
    }
  } catch (err) {
    console.error("Update Item in Cart error: ", err);
    next(err);
  }
};

export { getItems, addItem, removeItem, updateItem };