const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new mongoose.Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true }
  }],
  total: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
