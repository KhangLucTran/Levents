const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes"); // Thêm authRoutes
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const addressRoutes = require("./routes/addressRoutes");
const initializeRoles = require("./config/roleInit");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// MongoDB connection URL
const mongoDBURL =
  "mongodb+srv://khangluctran:sw91dM0z5LaffpYj@levents-test-pro.8kylh.mongodb.net/?retryWrites=true&w=majority&appName=levents-test-pro";

// Connect to MongoDB
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Sử dụng các routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/address", addressRoutes);
