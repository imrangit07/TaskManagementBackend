const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title:String,
    description:String,
    dueDate:String,
    priority:String,
    status:String,
    completedAt:Date,
    userId:{ type: mongoose.Types.ObjectId, ref: "UserData" }

})

module.exports = mongoose.model("allTask",TaskSchema);