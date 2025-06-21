const nodemailer = require("nodemailer");
const AdminModel = require("../models/AdminModels");
const userModel = require("../models/UserModels");
const taskModel = require("../models/TaskModels")
const PasswordGen = require("../Utils/PasswordGen");


const adminLogin = async (req, res) => {
  const { admin, password } = req.body;
  const adminData = await AdminModel.findOne({ adminName: admin });
  try {
    if (!adminData) {
      res.status(401).send({ msg: "Invalid User Name!" })
    }
    if (adminData.password != password) {
      res.status(401).send({ msg: "Invalid Password!" })
    }
    res.status(200).send({ msg: "Login Successfully", adminData: { isAdminLogin: true, userName: admin } })

  } catch (error) {
    console.log(error);
  }

}

const CreateUser = async (req, res) => {
  const { userId, userName, userEmail, designation } = req.body;
  const password = PasswordGen();
  await userModel.create({
    userId,
    userName,
    userEmail,
    designation,
    password
  })


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: userEmail,
    subject: 'Sending Email by Admin',
    text: `Dear ${userName},

Welcome to our platform! Below are your login credentials:

Username: your email.
Password: ${password}

You can use these credentials to log in to your account. For security reasons, we recommend changing your password after your first login.

If you didn't request this or need any assistance, please contact our support team immediately.

Best regards,
[Imran hussain]`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email Succ sent: ' + info.response);
      res.send(info.response);
    }
  });

}
const getUserDetails = async (req, res) => {

  try {
    const userData = await userModel.find();

    res.send(userData);
  } catch (error) {
    console.log(error);

  }
}

const taskAssign = async (req, res) => {
  const { userId, title, description, dueDate, priority } = req.body;
  const date = new Date();

  try {
    await taskModel.create({
      userId,
      title,
      description,
      dueDate,
      priority,
      status: "pending",
      createdAt: date.toLocaleString('en-IN')
    });

    res.status(201).send({ msg: "Task Assign Successfuly!" })
  } catch (error) {
    res.status(500).send({ msg: error })
  }

}

const updateTask = async (req, res) => {
  const { id, title, description, dueDate, priority, status } = req.body;
  const date = new Date();

  try {
    await taskModel.findByIdAndUpdate(id, {
      title,
      description,
      dueDate,
      priority,
      status: "pending",
      updateAt: date.toLocaleString('en-IN')
    });

    res.status(201).send({ msg: "Task Updated Successfuly!" })
  } catch (error) {
    res.status(500).send({ msg: error })
  }

}

const getAllTasks = async (req, res) => {
  const allTasks = await taskModel.find().populate("userId", "userName userEmail designation");
  try {
    res.status(200).send(allTasks);
  } catch (error) {
    res.status(500).send({ msg: error });
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await taskModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
}

module.exports = {
  adminLogin,
  CreateUser,
  getUserDetails,
  taskAssign,
  getAllTasks,
  updateTask,
  deleteTask
}