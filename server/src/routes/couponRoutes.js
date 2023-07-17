const express = require("express");
const router = express.Router();
const CouponController = require("../controllers/couponController");

router.post("/addcoupon", CouponController.addCoupon);
router.post("/disablecoupon", CouponController.disableCoupon);
router.get("/getcoupon", CouponController.getCoupons);

module.exports = router;
