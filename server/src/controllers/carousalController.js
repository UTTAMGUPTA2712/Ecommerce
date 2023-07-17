const mongoose = require("mongoose");
const Carousal = require("../models/carousal");

const createCarousal = async (req, res) => {
    try {
        const response = await Carousal.create(req.body);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};
const deleteCarousal = async (req, res) => {
    try {
        const response = await Carousal.deleteOne({_id: new mongoose.Types.ObjectId(req.body.id)});
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};
const getCarousal= async (req, res) => {
    try {
        const response = await Carousal.find({})
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};
module.exports = {
    createCarousal,
    deleteCarousal,
    getCarousal
};
