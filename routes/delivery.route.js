const router = require('express').Router();
const {
    createDelivery, deleteDelivery, getAllDeliveries, updateDelivery
} = require('../controllers/delivery.controller');


// Create new delivery
router.post('/', createDelivery);


// Get all deliveries
router.get('/', getAllDeliveries);


// Update delivery status
router.put('/:id', updateDelivery);


// Delete delivery
router.delete('/:id', deleteDelivery);


module.exports = router;