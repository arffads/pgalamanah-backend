const express = require("express");
const router = express.Router();
const {
  getStudent,
  registerStudent,
  signInStudent,
  findStudentByNis,
  updateStudent,
  deleteStudent,
  getStudentByClassCode,
} = require("./student.controller");
const {
  checkDuplicateUsernameStudent,
} = require("../../middleware/verifySignUp");
const { verifyToken } = require("../../middleware/token");

//signup endpoint
//passing the middleware function to the signup
router.post("/register", checkDuplicateUsernameStudent, registerStudent);

//login route
router.post("/login", signInStudent);

// router.get("/find/class/:classDetailId", verifyToken, findSiswaByClassDetail);

router.get("/list", verifyToken, getStudent);

router.get("/list/:kode_kelas", verifyToken, getStudentByClassCode);

router.get("/find/:nis", verifyToken, findStudentByNis);

router.put("/update/:nis", verifyToken, updateStudent);

router.delete("/delete/:nis", verifyToken, deleteStudent);

module.exports = router;
