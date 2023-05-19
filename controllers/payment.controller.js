// paypalController.js
const paypal = require('paypal-rest-sdk');

// Set up PayPal configuration
paypal.configure({
    mode: 'sandbox', // Change to 'live' for production
    client_id: 'ARDRijRKqBzfNpFzZoc4Qy0FiYX2y-xDHqZqRzzbiKEGa2WB67qoUTUNUBFhue-_E4BWqjALpOscWWKT',
    client_secret: 'EN9ClT16KrTLAy71AFeITLUNf6GZQ_VF4jlbeN2-fcYAWDfH-JCyFshIjeM8taBmYElHjNGTuUzpyUCz'
});

// Controller function to initiate a PayPal checkout session
exports.initiateCheckout = (req, res) => {
    // Create a PayPal payment request
    const payment = {
        intent: 'sale', payer: {
            payment_method: 'paypal'
        }, redirect_urls: {
            return_url: 'http://localhost:3000/paypal/checkout/success',
            cancel_url: 'http://localhost:3000/paypal/checkout/cancel'
        }, transactions: [{
            amount: {
                total: '10.00', currency: 'USD'
            }, description: 'Example PayPal payment'
        }]
    };

    // Create the PayPal payment
    paypal.payment.create(payment, (error, payment) => {
        if (error) {
            console.error(error);
            res.redirect('/error'); // Redirect to an error page
        } else {
            // Redirect the user to PayPal for payment approval
            const redirectUrl = payment.links.find(link => link.rel === 'approval_url').href;
            res.redirect(redirectUrl);
        }
    });
};

// Controller function to handle the successful completion of a PayPal checkout
exports.successfulCheckout = (req, res) => {
    const paymentId = req.query.paymentId;
    const payerId = req.query.PayerID;

    console.log(paymentId);
    console.log(payerId);

    // Execute the PayPal payment
    paypal.payment.execute(paymentId, {payer_id: payerId}, (error, payment) => {
        if (error) {
            console.error(error);
            res.redirect('/error'); // Redirect to an error page
        } else {
            // Payment successful
            res.render('success', {payment: payment});
        }
    });
};

// Controller function to handle the cancellation of a PayPal checkout
exports.cancelCheckout = (req, res) => {
    console.log('Payment cancelled.');
    res.redirect('/'); // Redirect to home page
};

// Controller function to create a PayPal payment
exports.createPayment = (req, res) => {
    // Create a PayPal payment request
    const payment = {
        intent: 'sale', payer: {
            payment_method: 'paypal'
        }, transactions: [{
            amount: {
                total: '20.00', currency: 'USD'
            }, description: 'Example PayPal payment'
        }]
    };

    // Create the PayPal payment
    paypal.payment.create(payment, (error, payment) => {
        if (error) {
            console.error(error);
            res.status(500).json({error: 'Failed to create PayPal payment.'});
        } else {
            res.status(200).json({paymentId: payment.id});
        }
    });
};

// Controller function to execute a PayPal payment
exports.executePayment = (req, res) => {
    const paymentId = req.body.paymentId;
    const payerId = req.body.payerId;

    // Execute the PayPal payment
    paypal.payment.execute(paymentId, {payer_id: payerId}, (error, payment) => {
        if (error) {
            console.error(error);
            res.status(500).json({error: 'Failed to execute PayPal payment.'});
        } else {
            res.status(200).json({status: 'Payment executed successfully.'});
        }
    });
};

// Controller function to handle PayPal webhooks
exports.handleWebhook = (req, res) => {
    // Process the PayPal webhook payload
    const webhookEvent = req.body;

    // Perform necessary actions based on the webhook event
    switch (webhookEvent.event_type) {
        case 'PAYMENT.CAPTURE.COMPLETED':
            // Payment capture completed
            console.log('Payment capture completed.');
            res.status(200).send("Payment capture completed.");
            break;
        case 'PAYMENT.CAPTURE.DENIED':
            // Payment capture denied
            console.log('Payment capture denied.');
            res.status(200).send("Payment capture denied.");
            break;
        case 'PAYMENT.CAPTURE.PENDING':
            // Payment capture pending
            console.log('Payment capture pending.');
            res.status(200).send("Payment capture pending.");
            break;
        case 'PAYMENT.CAPTURE.REFUNDED':
            // Payment capture refunded
            console.log('Payment capture refunded.');
            res.status(200).send("Payment capture refunded.");
            break;
        case 'PAYMENT.CAPTURE.REVERSED':
            // Payment capture reversed
            console.log('Payment capture reversed.');
            res.status(200).send("Payment capture reversed.");
            break;
        case 'PAYMENT.CAPTURE.REJECTED':
            // Payment capture rejected
            console.log('Payment capture rejected.');
            res.status(200).send("Payment capture rejected.");
            break;
        case 'PAYMENT.CAPTURE.CANCELLED':
            // Payment capture cancelled
            console.log('Payment capture cancelled.');
            res.status(200).send("Payment capture cancelled.");
            break;
        default:
            // Other webhook event
            console.log('Other webhook event.');
            res.status(200).send("Other webhook event.");
            break;
    }
};
