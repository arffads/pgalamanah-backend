const express = require("express");
const router = express.Router();
const {
  getStudent,
  registerStudent,
  signInStudent,
  findStudentByNis,
  updateStudent,
  deleteStudent,
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

router.get("/list", verifyToken, getStudent);

router.get("/find/:nip", verifyToken, findStudentByNis);

router.put("/update/:nip", verifyToken, updateStudent);

router.delete("/delete/:nip", verifyToken, deleteStudent);

module.exports = router;
