const router = require("express").Router();
const {addSeller,getAllSeller,getOneSeller,updateSeller,deleteSeller} = require('./../controllers/seller.controller')


//Create seller operation
router.post("/add",addSeller);

//Retrieve seller operation (All sellers)
router.get("/", getAllSeller);

//Retrieve seller operation (One seller)
router.get("/get/:id",getOneSeller)

//Update seller operation 
router.put("/update/:id",updateSeller)

//Delete seller operation
router.delete("/delete/:id",deleteSeller)


//Export the module
module.exports = router;

