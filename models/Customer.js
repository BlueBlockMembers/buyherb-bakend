const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    customerName : {
        type : String,
        required : true
    },

    customerAddress : {
        type : String,
        required : true
    }

})

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;