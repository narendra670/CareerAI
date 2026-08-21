const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, saveCareer } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/save-career/:careerId', protect, saveCareer);

module.exports = router;
