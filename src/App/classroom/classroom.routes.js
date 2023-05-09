// importing modules For ClassRoom Routes
const express = require('express');
const router = express.Router();
const {
  getClass,
  createClass,
  updateClassRoom,
  deleteClassRoom,
  findClassByClassCode,
  getClassByNip
} = require('./classroom.controller');
const { checkDuplicateClassroom } = require('../../middleware/verifySignUp.js');
const { verifyToken } = require('../../middleware/token');

// Endpoint For Class
// Create New Class
router.post('/create', checkDuplicateClassroom, verifyToken, createClass);
// List All Class Was Created
router.get('/list', verifyToken, getClass);

router.get('/list/:nip/:status?', verifyToken, getClassByNip);

// Find Class By Class Code
router.get('/:kode_kelas', verifyToken, findClassByClassCode);
// Update Class
router.put('/update/:kode_kelas', verifyToken, updateClassRoom);
// Delete Class
router.delete('/delete/:kode_kelas', verifyToken, deleteClassRoom);

module.exports = router;
