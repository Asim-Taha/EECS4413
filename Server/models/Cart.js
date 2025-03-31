import mongoose from 'mongoose';
const { Schema } = mongoose;

// This schema assumes the input of product number and product quantity value as mandatory entries
const CartItemSchema = new Schema ({
  product: {type: String, required: true},
  quantity: {type: Number, required: true, min: 1}
});

// This schema assumes the input of username/userID, however for now it is not required 
const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: false }, 
  items: [CartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;

  
