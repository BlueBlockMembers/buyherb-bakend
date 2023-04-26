const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const dbConnection = require('./configs/DB');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
dbConnection();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, DELETE')
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type', "Authorization")
    res.header("Access-Control-Allow-Credentials", true)
    next();
});

app.get('/', async (req, res, next) => {
    res.send({message: 'Awesome it works 🐻'});
});

app.use('/api/category', require('./routes/category.route'));
app.use('/api/product', require('./routes/product.route'));
app.use('/api/order', require('./routes/order.routes'));

app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
