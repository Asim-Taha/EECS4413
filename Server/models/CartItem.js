const mongoose = require('mongoose');

const cartItemS = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    min: [1, 'Quantity must be 1 or more.'],
    required: true,
    default: 1
  }
});

module.exports = mongoose.model('CartItem', cartItemS);



