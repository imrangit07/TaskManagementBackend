const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    adminName:String,
    password:String
})


module.exports = mongoose.model("adminData",AdminSchema)