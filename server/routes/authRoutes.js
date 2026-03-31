const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateProfile, guestLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/guest', guestLogin);

// Protected
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
