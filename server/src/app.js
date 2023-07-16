const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { mongoString } = require("./config");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cors());
app.use(express.static(path.join(__dirname, "/uploads")));
app.use("/auth", authRoutes);
app.use("/order", orderRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

module.exports = app;
