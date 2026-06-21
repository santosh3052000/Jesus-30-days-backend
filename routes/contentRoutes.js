const express = require('express');
const { getAllDays, getDay } = require('../controllers/contentController');
const { protect } = require('../Middleware/auth');

const router = express.Router();

// Public routes (guests can see content too)
router.get('/', getAllDays);
router.get('/:day', getDay);

module.exports = router;