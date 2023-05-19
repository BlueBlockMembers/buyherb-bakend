const express = require('express');
const router = express.Router();
const paypalController = require('./../controllers/payment.controller');

router.get('/paypal/checkout', paypalController.initiateCheckout);
router.get('/paypal/checkout/success', paypalController.successfulCheckout);
router.get('/paypal/checkout/cancel', paypalController.cancelCheckout);
router.post('/paypal/create-payment', paypalController.createPayment);
router.post('/paypal/execute-payment', paypalController.executePayment);
router.post('/paypal/webhook', paypalController.handleWebhook);

module.exports = router;