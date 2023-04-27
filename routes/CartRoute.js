const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Create a new cart
router.post('/create', async (req, res) => {
  try {
    const cart = new Cart({
      items: req.body.items,
      total: req.body.total
    });
    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific cart
router.get('/:id', getCart, (req, res) => {
  res.json(res.cart);
});

// Update a specific cart
router.patch('/:id', getCart, async (req, res) => {
  if (req.body.items != null) {
    res.cart.items = req.body.items;
  }
  if (req.body.total != null) {
    res.cart.total = req.body.total;
  }
  try {
    const updatedCart = await res.cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a specific cart
router.delete('/:id', getCart, async (req, res) => {
  try {
    await res.cart.remove();
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a specific cart by ID
async function getCart(req, res, next) {
  let cart;
  try {
    cart = await Cart.findById(req.params.id);
    if (cart == null) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.cart = cart;
  next();
}

module.exports = router;
