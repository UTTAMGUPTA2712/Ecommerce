const mongoose = require("mongoose");
const User = require("../models/user")

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const response = await User.find({});
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};

// Edit user profile
const editUserProfile = async (req, res) => {
    try {
        await User.updateOne(
            { email: req.body.email },
            { $set: { name: req.body.name, address: req.body.address } }
        );
        res.send("SUCCESS");
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};

// Update user status
const updateUserStatus = async (req, res) => {
    try {
        const response = await User.updateOne(
            { email: req.body.email },
            { $set: { status: req.body.status } }
        );
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("SERVER ERROR");
    }
};

module.exports = {
    getAllUsers,
    editUserProfile,
    updateUserStatus,
};
