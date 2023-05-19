const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// Create a new customer
router.post("/create", async (req, res) => {
  try {
    const { name, email, password, city, state, zipcode } = req.body;
    const customer = new Customer({ name, email, password, city, state, zipcode });
    await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.send(customers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a customer by ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send();
    }
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a customer by ID
router.patch("/:id", async (req, res) => {
  try {
    const { name, email, password, city, state, zipcode } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, password, city, state, zipcode },
      { new: true }
    );
    if (!customer) {
      return res.status(404).send();
    }
    res.send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a customer by ID
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).send();
    }
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});





module.exports = router;
