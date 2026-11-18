const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/me', protect, getMe);

// TODO: POST /forgot-password
// TODO: PUT  /reset-password/:resetToken
// TODO: PUT  /update-profile

module.exports = router;
