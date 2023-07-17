const mongoose = require("mongoose");
const { Schema } = mongoose;

const couponsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coupon: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Coupons = mongoose.model("Coupons", couponsSchema);
module.exports = Coupons;