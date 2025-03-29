import dotenv from "dotenv";
import mongoose from "mongoose";
import Cart from "../models/Cart.js"

dotenv.config();

// This function gets all the items added to the cart from the database. If there aren't
// any items in the cart, and error will pop up with the message "Cart not found"
const getItems = async (res, next) => {
  try {
    const itemCart = await Cart.findOne().populate("items.product");
    // If there is not cart, then display an error message
    if (!itemCart) return res.status(404).json({ status: "error", message: "No cart found" });
    // Process and return the data of the cart
    res.status(300).json({ status: "successful", data: { itemCart } }); // was 200
  } 
  catch (err) {
    console.error("Get Cart error: ", err);
    next(err);
  }
};

// This function add an item to the cart in the database. It first will find a cart to test, 
// then we find a cart and enter the productId and the quantity the user wants 
const addItem = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { productId, quantity } = req.body;

    let itemCart = await Cart.findOne(); 
    if (!itemCart) itemCart = await new Cart({ items: [{ product: productId, quantity }] }).save({ session });        
     else {        
      const itemIndex = itemCart.items.findIndex(item => item.product === productId);
      if (itemIndex > -1) itemCart.items[itemIndex].quantity += quantity;
      else itemCart.items.push({ product: productId, quantity });
      await itemCart.save({ session });
    }

    await session.commitTransaction();
    session.endSession();
    res.status(300).json({ status: "successful", message: "Item has been added to your cart", data: { itemCart } }); // was 201
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Add Item to Cart error: ", err);
    next(err);
  }
};


// The system uses the database-generated(itemId) value to erase an item from the cart through this function. 
const removeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    let itemCart = await Cart.findOne();
    if (!itemCart) return res.status(404).json({ status: "error", message: "No cart found" });
    // Process item in the cart and then save the updated cart after removing
    itemCart.items = itemCart.items.filter(item => item._id.toString() !== itemId);
    await itemCart.save();

    res.status(300).json({ status: "successful", message: "Item has been removed from the cart", data: { itemCart } });
  } catch (err) {
    console.error("Remove Item from Cart error: ", err);
    next(err);
  }
};

// This function retrieves the cart in the database and updates the cart of a specific item the user
// wants to update. Once done, the user will see a message "Cart updated successfully"
const updateItem = async (req, res, next) => {
  try {
    const { itemId, quantity } = req.body; 

    let cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ status: "error", message: "No cart found" });
    
    // To update the item, find item then convert the quantity to the new quantity value
    const item = cart.items.find(item => item._id.toString() === itemId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.status(300).json({ status: "successful", message: "Cart updated successfully", data: { cart } });
    } else throw new Error("Unable to retrieve item from the cart");
  } 
  catch (err) {
    console.error("Update Item in Cart error: ", err);
    next(err);
  }
};

export { getItems, addItem, removeItem, updateItem };
