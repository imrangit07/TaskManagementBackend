const express = require('express');
const Router = express.Router();
const AdminController= require("../controllers/AdimnControllers")
const UserController = require("../controllers/UserControllers")
Router.post("/adminlogin",AdminController.adminLogin);
Router.post("/createuser",AdminController.CreateUser);
Router.post("/taskassign",AdminController.taskAssign);
Router.get("/getuser",AdminController.getUserDetails);
Router.get("/gettasks",AdminController.getAllTasks);
Router.delete("/deletetask/:id",AdminController.deleteTask);
Router.put("/updatetask",AdminController.updateTask);


// ----------USER ROUTERS--------------

Router.post("/userlogin",UserController.UserLogin)
Router.get("/getusertasks",UserController.getAllUserTasks);  
Router.patch("/changetaskstatus/:id",UserController.changeTaskStatus);
Router.patch("/changepass/:id",UserController.changePassword);


module.exports = Router