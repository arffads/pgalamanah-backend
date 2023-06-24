// importing modules for Admin Routes
const express = require('express');
const router = express.Router();
const { getAdmin, registerAdmin, signInAdmin } = require('./admin.controller');
const {
  checkDuplicateUsernameAdmin
} = require('../../middleware/verifySignUp');
const { verifyToken } = require('../../middleware/token');

// Create New Account For Administrator
router.post('/register', checkDuplicateUsernameAdmin, registerAdmin);

// Sign In Account For Adminstrator
router.post('/login', signInAdmin);

// Get All Administrator
router.get('/list', verifyToken, getAdmin);

module.exports = router;
