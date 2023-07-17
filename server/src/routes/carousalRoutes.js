const express = require("express");
const router = express.Router();
const CarousalController = require("../controllers/carousalController");

router.post("/createcarousal", CarousalController.createCarousal);
router.post("/deletecarousal", CarousalController.deleteCarousal);
router.get("/getcarousal", CarousalController.getCarousal);

module.exports = router;
