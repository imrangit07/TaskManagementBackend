// index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const adminRoutes = require("./routes/AdminRoutes");
const userRoutes = require("./routes/UserRoutes");

// Use Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

// Root route for Render test
app.get("/", (req, res) => {
  res.send("Server is live!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
