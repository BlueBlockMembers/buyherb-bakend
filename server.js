const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");


const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const connection = mongoose.connection;
connection.once("open" , () => {
    console.log("MongoDB Connection Success ");
});


app.use(express.json());

const productRoutes = require("./routes/ProductRoute");
const orderRoutes = require("./routes/OrderRoute");
const cartRoutes = require("./routes/CartRoute");
const customerRoutes = require("./routes/CustomerRoute");
const loginRoutes  = require("./routes/LoginRoute");
const sellerRoutes = require("./routes/SellerRoute");
const paymentRoutes = require("./routes/payment.route");
const deliveryRoutes = require("./routes/delivery.route");

app.use("/product", productRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/customer', customerRoutes);
app.use('/login', loginRoutes);
app.use('/seller', sellerRoutes);
app.use('/payment', paymentRoutes);
app.use('/delivery', deliveryRoutes);


app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});