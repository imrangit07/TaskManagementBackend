const UserModel = require("../models/UserModels")
const taskModel = require("../models/TaskModels")
const UserLogin = async (req, res) => {
  const { userEmail, password } = req.body;
  const UserData = await UserModel.findOne({ userEmail: userEmail });

  try {
    if (!UserData) {
      res.status(401).send({ msg: "Invalid User Name!" })
    }
    if (UserData.password != password) {
      res.status(401).send({ msg: "Invalid Password!" })
    }
    res.status(200).send({ msg: "Login Successfully", UserData: { userId: UserData._id, userName: UserData.userName } })

  } catch (error) {
    console.log(error);

  }
}
const getAllUserTasks = async (req, res) => {
  const { id } = req.query;

  try {
    const allTasks = await taskModel.find({ userId: id }).populate("userId")
    res.status(200).send(allTasks);
  } catch (error) {
    res.status(500).send({ msg: error });
  }
}

const changeTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await taskModel.findById(id);

    if (task.status === 'completed') {
      return res.status(400).send({ msg: "Cannot change status of already completed task" });
    }
    const date = new Date();
    await taskModel.findByIdAndUpdate(
      id,
      {
        status: status,
        completedAt: status === "completed" ? date : null
      }
    );

    res.status(200).send({ msg: "Task status updated successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
}

const changePassword = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword, confirmPassword } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).send({ msg: "Invalid password" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).send({ msg: "Passwords do not match" });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).send({ msg: "Password changed successfully" });
  } catch (error) {
    res.status(500).send({ msg: error });
  }

}

module.exports = { UserLogin, getAllUserTasks, changeTaskStatus, changePassword };