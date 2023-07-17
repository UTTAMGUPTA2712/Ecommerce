const mongoose = require("mongoose");
const Coupons = require("../models/coupons");

const addCoupon = async (req, res) => {
    try {
        const response = await Coupons.create(req.body);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};
const disableCoupon = async (req, res) => {
    try {
        const response = await Coupons.deleteOne({_id: new mongoose.Types.ObjectId(req.body.id)});
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};
const getCoupons= async (req, res) => {
    try {
        const response = await Coupons.find({})
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};
module.exports = {
    addCoupon,
    disableCoupon,
    getCoupons
};