import mongoose from "mongoose";
//This code  defines a schema and a model named User
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: String,
    quantity: String,
    price : Number
});

var UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;