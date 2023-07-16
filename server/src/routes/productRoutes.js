const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/additem", productController.addProduct);
router.get("/product", productController.getAllProducts);
router.post("/updateproduct", productController.updateProduct);
router.post("/productstatus", productController.updateProductStatus);

module.exports = router;
