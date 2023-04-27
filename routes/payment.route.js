const router = require('express').Router();
const {getToken, checkoutPaypal, successPaypal} = require('../controllers/payment.controller');


router.get('/getToken', getToken);
// Route to initiate a PayPal checkout session
router.post('/paypal/checkout', checkoutPaypal);

// Route to handle successful completion of a PayPal checkout
router.get('/paypal/checkout/success', successPaypal);
