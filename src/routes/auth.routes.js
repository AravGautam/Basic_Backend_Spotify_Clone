const express = require('express');
const authController = require('../controllers/auth.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const router = express.Router();    

// Register route
router.post('/register', validationMiddleware.validateRegistration, authController.registerUser);

// Login route
router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser);

module.exports = router;