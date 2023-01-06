const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/audio/" });
const {
  getAllPerhafalan,
  findPerhafalanById,
  findPerhafalanByStudentNis,
  updatePerhafalanByTeacher,
  deletePerhafalan,
  studentPostPerhafalan,
} = require("../perhafalan/perhafalan.controller");

const { verifyToken } = require("../../middleware/token");

/* ENDPOINT FOR PERHAFALAN */
router.get("/list", verifyToken, getAllPerhafalan);

router.get("/:hafalan_id/:nis?", verifyToken, findPerhafalanById);

router.get("/:nis", verifyToken, findPerhafalanByStudentNis);

router.put("/update-teacher/:id", verifyToken, updatePerhafalanByTeacher);

router.post(
  "/submission",
  [verifyToken, upload.single("record")],
  studentPostPerhafalan
);

router.delete("/delete/:id", verifyToken, deletePerhafalan);

module.exports = router;
