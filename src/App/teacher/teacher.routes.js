const express = require('express');
const router = express.Router();
const {
  registerTeacher,
  getTeacher,
  signInTeacher,
  findTeacherByNip,
  deleteTeacher,
  updateTeacher
} = require('./teacher.controller');
const {
  checkDuplicateUsernameTeacher
} = require('../../middleware/verifySignUp');
const { verifyToken } = require('../../middleware/token');

// signup endpoint
router.post('/register', checkDuplicateUsernameTeacher, registerTeacher);

// login route
router.post('/login', signInTeacher);

router.get('/list', verifyToken, getTeacher);

router.get('/find/:nip', verifyToken, findTeacherByNip);

router.put('/update/:nip', verifyToken, updateTeacher);

router.delete('/delete/:nip', verifyToken, deleteTeacher);

module.exports = router;
