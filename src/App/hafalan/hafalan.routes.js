const express = require("express");
const router = express.Router();
const {
  getAllHafalan,
  addHafalan,
  getHafalanByCategoryId,
  updateHafalan,
  deleteHafalan,
  getHafalanByNis,
} = require("./hafalan.controller");

const { verifyToken } = require("../../middleware/token");

//signup endpoint
//passing the middleware function to the signup
router.post("/add-hafalan", verifyToken, addHafalan);

router.get("/list-hafalan", verifyToken, getAllHafalan);
router.get("/list-hafalan/:nis", verifyToken, getHafalanByNis);

router.get("/:category_id", verifyToken, getHafalanByCategoryId);

router.put("/update/:id", verifyToken, updateHafalan);

router.delete("/delete/:id", verifyToken, deleteHafalan);

module.exports = router;
