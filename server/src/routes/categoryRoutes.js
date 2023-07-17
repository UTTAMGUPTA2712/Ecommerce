const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");

router.post("/addcategory", CategoryController.addCategory);
router.post("/deletebanner", CategoryController.deleteCategory);
router.get("/getcategory", CategoryController.getCategory);

module.exports = router;
