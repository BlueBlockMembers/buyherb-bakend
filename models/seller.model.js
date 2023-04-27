const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sellerShema = new Schema({

    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    image : {
        type : String
    }

});

//Send the details to the db
const Seller = mongoose.model("Seller", sellerShema); //In the mongodb document(table) name will be sellers

module.exports = Seller;