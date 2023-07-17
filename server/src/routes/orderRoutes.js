const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/placeorder", orderController.placeOrder);
router.get("/orders", orderController.getAllOrders);
router.post("/orderstatus", orderController.updateOrderStatus);
router.post("/orders",orderController.getUserOrders)
module.exports = router;
