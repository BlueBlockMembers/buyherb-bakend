const DeliveryModel = require('../models/delivery.model');
const OrderModel = require('../models/order.model');

// Create new delivery
const createDelivery = async (req, res) => {
  try {
    const { orderId, location, deliveryDate } = req.body;
    const order = await OrderModel.findById(orderId);
    if (!order) return res.status(400).json({ msg: 'Order not found' });
    const delivery = new DeliveryModel({
      orderId,
      location,
      deliveryDate,
    });
    await delivery.save();
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all deliveries
const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await DeliveryModel.find().populate('orderId');
    res.json(deliveries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update delivery status
const updateDelivery = async (req, res) => {
  try {
    const delivery = await DeliveryModel.findById(req.params.id);
    if (!delivery) return res.status(400).json({ msg: 'Delivery not found' });
    delivery.status = req.body.status;
    if (req.body.location) delivery.location = req.body.location;
    if (req.body.deliveryDate) delivery.deliveryDate = req.body.deliveryDate;
    delivery.updated = Date.now();
    await delivery.save();
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete delivery
const deleteDelivery = async (req, res) => {
  try {
    const delivery = await DeliveryModel.findById(req.params.id);
    if (!delivery) return res.status(400).json({ msg: 'Delivery not found' });
    await delivery.remove();
    res.json({ msg: 'Delivery deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  createDelivery,
  getAllDeliveries,
  updateDelivery,
  deleteDelivery,
};
