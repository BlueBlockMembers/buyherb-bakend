//Import seller model
let SellerModel = require("./../models/seller.model");

//Add seller
const addSeller = (req, res) => {

    const name = req.body.name;
    const address = req.body.address;
    const mobile = Number(req.body.mobile);
    const email = req.body.email;
    const description = req.body.description;
    const image = req.body.image;

    //Create an object from Seller model
    const newSeller = new SellerModel({

        name,
        address,
        mobile,
        email,
        description,
        image
    })

    //Send the object to the db through the shema model using JS promise
    newSeller.save().then(() => {
        //If success
        res.json("Seller Added.");

    }).catch((err) => {
        //If not success
        console.log(err);
    })
}

//Retrieve all selle
const getAllSeller = (req, res) => {

    SellerModel.find().then((sellers) => {
        //If success
        res.json(sellers);

    }).catch((err) => {
        //If not success
        console.log(err);
    })
}

const getOneSeller = async (req, res) => {

    //Fetch the id to the veriable userId
    let userId = req.params.id;

    const user = await SellerModel.findById(userId).then(() => {

        //If success
        res.status(200).send({ status: "User fetched", user: user });

    }).catch(() => {

        //If not success
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })

}

const updateSeller = async (req, res) => {

    //Fetch the id to the veriable userId
    let userId = req.params.id;

    //Use destructure (Not using const name = req.body.name) to fatch the data send form frontend
    const { name, address, mobile, email, description, image } = req.body;

    //Object to update
    const updateSeller = {
        name,
        address,
        mobile,
        email,
        description,
        image
    }


    //Wait until the pomise recieve
    const update = await SellerModel.findByIdAndUpdate(userId, updateSeller).then(() => {

        //Send a response that update success
        res.status(200).send({ status: "User updated", user: update });

    }).catch((err) => {
        console.log(err);

        //send error to frontend 500 server error
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })

}

const deleteSeller = async (req, res) => {

    //Fetch the id to the veriable userId
    let userId = req.params.id;

    await SellerModel.findByIdAndDelete(userId).then(() => {

        //If success
        res.status(200).send({ status: "User deleted" });
    }).catch((err => {

        //If not success
        console.log(err.message);

        //send error to frontend 500 server error
        res.status(500).send({ status: "Error with delete user", error: err.message });

    }))

}




module.exports = {
    addSeller,
    getAllSeller,
    getOneSeller,
    updateSeller,
    deleteSeller
}