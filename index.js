const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
require("dotenv").config();
const app = express();

app.use(cors());
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