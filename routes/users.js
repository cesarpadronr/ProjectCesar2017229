import express from "express";
import User from "../schema/User"
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message:"Serving Users on the Endpoint."
    });   
});
//When a new user is created or updated, we need to list it on our UI, thsi command will query the MongoDB and find the User
router.get("/list", (req, res, next) => {
    User.find({})
        .exec()
        .then(docs => {
            res.status(200).json({
                docs
            });
        })
        .catch(err => {
            console.log(err)
        });
});
//To add the user, we will accept a couple of fields from our application form. It will be passed as JSON data to our endpoint. 
router.post("/add", (req, res, next) => {

    const user = new User({
        _id: mongoose.Types.ObjectId(),
        product: req.body.product,
        quantity:req.body.quantity,
        price: req.body.price
    });
//We will use ID as an internally generated key.
    user.save()
    .then(result => {
        res.status(200).json({
            docs:[user]
        });
    })
    .catch(err => {
        console.log(err);
    });
});
//we will find the User with given ID and if it is found we will remove it.
router.post("/delete", (req, res, next) => {
    const rid = req.body.id;

    User.findById(rid)
        .exec()
        .then(docs => {
            docs.remove();
            res.status(200).json({
                deleted:true
            });
        })
        .catch(err => {
            console.log(err)
        });
});

module.exports = router;