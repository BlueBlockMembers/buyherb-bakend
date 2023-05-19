const { default: mongoose, model } = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    
    productName : {
        type : String,
        required : true
    },
    productPrice : {
        type : Number,
        required : true
    },
    expDate : {
        type : Date,
        required : true
    },
    manufDate: {
        type: Date,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      images: [{
        type: String
      }]

})


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
 
