const express = require('express');
const { updateProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.put('/', protect, updateProgress);

module.exports = router;