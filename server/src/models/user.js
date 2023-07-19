const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  phone:{
    type: Number,
    required: true,
  }
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default:"Password"
    },
    phoneNumber: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    title: String,
    photo: String,
    address: {
      type: [addressSchema],
      default: [],
    },
    orders: {
      type: [Schema.Types.ObjectId],
      ref: "Order",
      default: [],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
