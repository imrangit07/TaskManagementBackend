const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
require("dotenv").config();
const app = express();
const allowedOrigins = ['https://task-management-stytem-07.netlify.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const Routers = require("./routes/AdimnRoutes")
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log("DB is Connected Successfully!");
});

app.use("/admin",Routers);
app.use("/user",Routers);

app.listen(port, () => {
    console.log("Server is running on port 3000");
})