const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId:Number,
    userName:String,
    userEmail:String,
    designation:String,
    password:String
})


module.exports = mongoose.model("UserData",UserSchema)