import mongoose from 'mongoose';
const { Schema } = mongoose;

// This schema assumes the input of product number and product quantity value as mandatory entries
const CartItemS = new Schema ({
  product: {type: String, required: true},
  quantity: {type: Number, required: true, min: 1}
});

// This schema assumes the input of username/userID, however for now it is not required 
// const cartSchemaUser = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'user', required: false }, 
//   items: [CartItemS]
// });

const Cart = mongoose.model('Cart', CartItemS);
export default Cart;

  
