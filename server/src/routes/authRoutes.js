const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/Login", authController.login);
router.post("/Signup", authController.signup);
router.post("/Google", authController.googleAuth);

module.exports = router;
