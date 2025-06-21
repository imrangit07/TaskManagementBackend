const express = require('express');
const Router = express.Router();
const UserController = require("../controllers/UserControllers")


Router.post("/userlogin",UserController.UserLogin)
Router.get("/getusertasks",UserController.getAllUserTasks);  
Router.patch("/changetaskstatus/:id",UserController.changeTaskStatus);
Router.patch("/changepass/:id",UserController.changePassword);
module.exports = Router