const router = require("express").Router();

let Product = require("../models/Product");

router.route("/add").post((req,res) => {

    const productName = req.body.productName;
    const productPrice = parseFloat(req.body.productPrice);
    const expDate = new Date(req.body.expDate);
    const manufDate = new Date(req.body.manufDate);
    const description = req.body.description;
    const images = req.body.images;

    const newProduct = new Product({
        productName,
        productPrice,
        expDate,
        manufDate,
        description,
        images
    })

    newProduct.save().then(() => {
        res.json("Product Added")
    }).catch((err) => {
        console.log(err);
    })
    
});


router.route("/").get((req, res) => {
    Product.find().then((products) => {
        res.json(products)
    }).catch((err) => {
        console.log(err);
    })
})



router.route("/update/:id").put(async (req,res) => {
    let productId = req.params.id;

    const {productName, productPrice, expDate, manufDate, description, images} = req.body;

    const updateProduct = {
        productName,
        productPrice,
        expDate,
        manufDate,
        description,
        images
    }

    const update = await Product.findByIdAndUpdate(productId, updateProduct).then(() => {
        res.status(200).send({status:"Product Updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status : "Error with updating data", error : err.message})
    })


})

router.route("/delete/:id").delete(async (req,res) => {

    let productId = req.params.id;

    await Product.findByIdAndDelete(productId).then(() => {
        res.status(200).send({status:"Product Deleted"
    }).catch((err) => {
        
        console.log(err.message);
        res.status(500).send({status : "Error with delete product", error : err.message})    
    })
    })
})


router.route("/get/:id").get(async (req, res) => {
    let productId = req.params.id;

    const productData = await Product.findById(productId)
    .then((product) => {
        res.status(200).send({status : "User fetched", product})
    }).catch((err) => {
        res.status(500).send({status : "Error with fetching data", error : err.message})
    })

})





module.exports = router;


