const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/getAllUser", userController.getAllUsers);
router.post("/editprofile", userController.editUserProfile);
router.post("/updateuserstatus", userController.updateUserStatus);

module.exports = router;
