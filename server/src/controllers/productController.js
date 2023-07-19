const mongoose = require("mongoose");
const Product = require("../models/product")

// Add a new product
const addProduct = async (req, res) => {
  try {
    const response = await Product.create(req.body);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const response = await Product.find({sender:{$ne:"DELETED PRODUCT"}})
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};

// Update product details
// const updateProduct = async (req, res) => {
//   try {
//     let reqdata = req.body;
//     delete reqdata._id;
//     console.log(reqdata);
//     const response = await Product.updateOne(
//       { _id: new mongoose.Types.ObjectId(req.body.id) },
//       { $set: { ...reqdata } }
//     );
//     console.log(response);
//     res.send(response);
//   } catch (error) {
//     console.log(error);
//     res.send("SERVER ERROR");
//   }
// };
const updateProduct = async (req, res) => {
  try {
    let reqdata = req.body;
    // delete reqdata._id;
    const response = await Product.updateOne(
      { _id: new mongoose.Types.ObjectId(reqdata._id) },
      { $set:{name:reqdata.name,category:reqdata.category,price:reqdata.price,description:reqdata.description,status:reqdata.status}}
    );
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};

// Update product status
const updateProductStatus = async (req, res) => {
  try {
    const response = await Product.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.id) },
      { $set: { status: req.body.status } }
    );
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};
const DeleteProduct = async (req, res) => {
  try {
    const response = await Product.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.id) },
      { $set: { sender: "DELETED PRODUCT" } }
    );
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
}
const getBestProducts = async (req, res) => {
  try {
    const response = await Product.find({status:"PUBLISHED"}).sort({ purchaseCount: 1 }).limit(15);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};
const productReview = async (req, res) => {
  try {
    console.log(req.body);
    const response = await Product.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.id) },
      { $push: { review: req.body.review },$set:{rate:req.body.rate} }
    );
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("SERVER ERROR");
  }
};
module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  updateProductStatus,
  DeleteProduct,
  getBestProducts,
  productReview
};