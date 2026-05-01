const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();    

// Register route
router.post('/register', authController.registerUser);

// Login route
router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser);

module.exports = router;