const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [String],
      default: [],
    },
    name: {
      type: String,
      default: "PRDODUCT NAME",
    },
    category: {
      type: String,
      default: "PRDODUCT CATEGORY",
    },
    price: {
      type: String,
      default: 0,
    },
    description: {
      type: String,
      default: "PRDODUCT DESCRIPTION",
    },
    image: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    purchaseCount:{
      type: Number,
      default:0
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;