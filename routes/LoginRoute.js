const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Customer = require("../models/Customer");
const jwt = require('jsonwebtoken');
const Seller = require("../models/Seller");

const secretKey = "aV3ryStr0ngAndUn1queS3cretK3y!";

// Login route
router.post("/", async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    if (userType === 'Customer') {
      // Find the customer with matching email
      const customer = await Customer.findOne({ email });
      if (!customer) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Compare the entered password with the stored hashed password using bcrypt
      const match = await bcrypt.compare(password, customer.password);
      if (match) {
        const token = jwt.sign({ user: customer, email: customer.email, customer }, secretKey, { expiresIn: '1h' });
        res.json({ message: "Login successful", token }); // Include the token in the response
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else if (userType === 'Seller') {
      // Find the seller with matching email
      const seller = await Seller.findOne({ email });
      if (!seller) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Compare the entered password with the stored hashed password using bcrypt
      const match = await bcrypt.compare(password, seller.password);
      if (match) {
        const token = jwt.sign({ user: seller, email: seller.email, seller }, secretKey, { expiresIn: '1h' });
        res.json({ message: "Login successful", token }); // Include the token in the response
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      res.status(400).json({ error: "Invalid user type" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/user", (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header

  try {
    // Verify the token and extract the email and customer object
    const { email, customer } = jwt.verify(token, secretKey);
    res.json({ email, customer }); // Return the email and customer in the response
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
