const paypal = require('paypal-rest-sdk');

// Configure PayPal SDK with your client ID and secret
paypal.configure({
    mode: 'sandbox',
    client_id: 'your_client_id',
    client_secret: 'your_client_secret'
});
const getToken = (req, res) => {
    paypal.authorization.create({
        grant_type: 'client_credentials'
    }, function (error, authorization) {
        if (error) {
            console.error(error);
        } else {
            console.log('Authorization Response', authorization);
            res.send(authorization);
        }
    });
};

const checkoutPaypal = (req, res) => {
    const payment = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel'
        },
        transactions: [{
            amount: {
                total: '10.00',
                currency: 'USD'
            },
            description: 'Sample Transaction'
        }]
    };

    paypal.payment.create(payment, function (error, payment) {
        if (error) {
            console.error(error);
        } else {
            console.log('Payment Response', payment);
            res.redirect(payment.links[1].href);
        }
    });
};

const successPaypal = (req, res) => {
    const paymentId = req.query.paymentId;
    const payerId = req.query.PayerID;

    const execute_payment_json = {
        payer_id: payerId
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.error(error);
        } else {
            console.log('Get Payment Response');
            console.log(JSON.stringify(payment));
            res.send('Payment Successful');
        }
    });
};

module.exports = {
    getToken,
    checkoutPaypal,
    successPaypal
}