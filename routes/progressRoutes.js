const express = require('express');
const { updateProgress } = require('../controllers/progressController');
const { protect } = require('../Middleware/auth');

const router = express.Router();

router.put('/', protect, updateProgress);

module.exports = router;