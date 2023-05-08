const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  addCategory,
  deleteCategory,
} = require("./category.controller");

const { verifyToken } = require("../../middleware/token");

//passing the middleware function to the signup
router.post("/add-category", verifyToken, addCategory);

router.get("/list", verifyToken, getAllCategory);
// router.get("/list/:nis", verifyToken, getCategoryHafalanByNis);

router.delete("/delete/:id", verifyToken, deleteCategory);

module.exports = router;
