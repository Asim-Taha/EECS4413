import express from "express";

const router = express.Router();

// Import all the controlling elements from the controller js file
import {addItem, getItems, removeItem, updateItem} from "../controllers/CartController.js"

router.post('/add', addItem); // This request posts an item into the database
router.get('/get', getItems); // This request requests and gets the cart from the database
router.delete('/remove/:itemId', removeItem); // This request deletes a specific item based on the random itemId assigned in the database
router.put('/update/:itemId', updateItem); // This request updates an item in the database

export default router;

