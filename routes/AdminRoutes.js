const express = require('express');
const Router = express.Router();
const AdminController= require("../controllers/AdimnControllers")

Router.post("/adminlogin",AdminController.adminLogin);
Router.post("/createuser",AdminController.CreateUser);
Router.post("/taskassign",AdminController.taskAssign);
Router.get("/getuser",AdminController.getUserDetails);
Router.get("/gettasks",AdminController.getAllTasks);
Router.delete("/deletetask/:id",AdminController.deleteTask);
Router.put("/updatetask",AdminController.updateTask);


module.exports = Router