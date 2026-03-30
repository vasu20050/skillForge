const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
