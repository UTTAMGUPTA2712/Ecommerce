const mongoose = require("mongoose");
const Order = require("../models/orders")
const User = require("../models/user")

// Place an order
const placeOrder = async (req, res) => {
  try {
    console.log("========", req.body);
    const response = await Order.create(req.body);
    console.log("place", response);
    const data = await User.updateOne(
      { email: req.body.email },
      { $push: { orders: response._id } }
    );
    console.log("hbbuhb", data);
    res.send(response._id);
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};
// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const response = await Order.find({});
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};
// Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const orders = req.body.map(order => new mongoose.Types.ObjectId(order));
    const response = await Order.find({ _id: { $in: orders } });
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
}
// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    await Order.updateOne(
      { _id: req.body.id },
      { $set: { status: req.body.status } }
    );
    res.send("SUCCESS");
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders
};
