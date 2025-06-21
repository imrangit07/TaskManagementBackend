const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['https://task-management-stytem-07.netlify.app'];

// Middlewares
app.use(helmet());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const AdminRouters = require("./routes/AdminRoutes");
const UserRouters = require("./routes/AdminRoutes");
app.use("/admin", AdminRouters);
app.use("/user", UserRouters);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Database connection
mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log("DB Connected Successfully!"))
  .catch(err => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});