import dotenv from "dotenv";
import mongoose from "mongoose";
import Cart from "../models/Cart.js";

dotenv.config();

// ============== GET CART ITEMS ==============
const getItems = async (req, res, next) => {
  try {
    const itemCart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!itemCart) {
      return res.status(404).json({ status: "error", message: "No cart found" });
    }
    res.status(200).json({ status: "successful", data: { itemCart } });
  } catch (err) {
    console.error("Get Cart error: ", err);
    next(err);
  }
};

// ============== ADD ITEM TO CART ==============
const addItem = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let itemCart = await Cart.findOne({ user: userId });

    if (!itemCart) {
      itemCart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
      await itemCart.save({ session });
    } else {
      const itemIndex = itemCart.items.findIndex(item =>
        item.product.toString() === productId
      );

      if (itemIndex > -1) {
        itemCart.items[itemIndex].quantity += quantity;
      } else {
        itemCart.items.push({ product: productId, quantity });
      }

      await itemCart.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: "successful",
      message: "Item has been added to your cart",
      data: { itemCart },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Add Item to Cart error: ", err);
    next(err);
  }
};

// ============== REMOVE ITEM FROM CART ==============
const removeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;

    let itemCart = await Cart.findOne({ user: userId });

    if (!itemCart) {
      return res.status(404).json({ status: "error", message: "No cart found" });
    }

    itemCart.items = itemCart.items.filter(
      item => item._id.toString() !== itemId
    );

    await itemCart.save();

    res.status(200).json({
      status: "successful",
      message: "Item has been removed from the cart",
      data: { itemCart },
    });
  } catch (err) {
    console.error("Remove Item from Cart error: ", err);
    next(err);
  }
};

// ============== UPDATE ITEM QUANTITY ==============
const updateItem = async (req, res, next) => {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ status: "error", message: "No cart found" });
    }

    const item = cart.items.find(item => item._id.toString() === itemId);

    if (item) {
      item.quantity = quantity;
      await cart.save();

      res.status(200).json({
        status: "successful",
        message: "Cart updated successfully",
        data: { cart },
      });
    } else {
      throw new Error("Unable to retrieve item from the cart");
    }
  } catch (err) {
    console.error("Update Item in Cart error: ", err);
    next(err);
  }
};

// ============== CLEAR CART ==============
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = []; // ✅ Clear items array
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Clear Cart Error:", err);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};


export { getItems, addItem, removeItem, updateItem };
