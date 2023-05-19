const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

// POST /sellers - Create a new seller
router.post('/', async (req, res) => {
  try {
    const { name, email, password, address, mobile, description, image } = req.body;
    const newSeller = new Seller({
      name,
      email,
      password,
      address,
      mobile,
      description,
      image
    });
    await newSeller.save();
    res.status(201).json({ message: 'Seller created successfully', seller: newSeller });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create seller' });
  }
});

// GET /sellers - Get all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get sellers' });
  }
});

// GET /sellers/:id - Get a seller by ID
router.get('/:id', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (seller) {
      res.json(seller);
    } else {
      res.status(404).json({ error: 'Seller not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to get seller' });
  }
});

// DELETE /sellers/:id - Delete a seller by ID
router.delete('/:id', async (req, res) => {
  try {
    const seller = await Seller.findByIdAndRemove(req.params.id);
    if (seller) {
      res.json({ message: 'Seller deleted successfully' });
    } else {
      res.status(404).json({ error: 'Seller not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete seller' });
  }
});

module.exports = router;
