const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// new cart
router.post('/create', async (req, res) => {
  try {
    const cart = new Cart({
      customer: req.body.customer,
      items: req.body.items,
      total: req.body.total
    });
    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// all cart
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get cart by id
router.get('/:id', getCart, (req, res) => {
  res.json(res.cart);
});

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

router.delete('/:id', getCart, async (req, res) => {
  try {
    await res.cart.remove();
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id; 
    const cart = await Cart.findOne({ customer: userId }); // Use id to find the cart
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




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
