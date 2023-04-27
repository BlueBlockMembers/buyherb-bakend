const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-transit', 'out-for-delivery', 'delivered', 'failed'],
        default: 'pending'
    },
    location: {
        type: String
    },
    deliveryDate: {
        type: Date
    },
    updated: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Delivery', DeliverySchema);