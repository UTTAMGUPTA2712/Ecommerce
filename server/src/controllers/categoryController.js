const mongoose = require("mongoose");
const Category = require("../models/category");

const addCategory = async (req, res) => {
    try {
        const response = await Category.create(req.body);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};
const deleteCategory = async (req, res) => {
    try {
        const response = await Category.deleteOne({_id: new mongoose.Types.ObjectId(req.body.id)});
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};
const getCategory= async (req, res) => {
    try {
        const response = await Category.find({})
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};
module.exports = {
    addCategory,
    deleteCategory,
    getCategory
};
