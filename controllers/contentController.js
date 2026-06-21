const DailyLesson = require('../models/DailyLesson');

// @desc    Get all days (for admin or seeding preview)
// @route   GET /api/content
exports.getAllDays = async (req, res, next) => {
  try {
    const lessons = await DailyLesson.find().sort({ day: 1 });
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single day's content
// @route   GET /api/content/:day
exports.getDay = async (req, res, next) => {
  try {
    const day = parseInt(req.params.day);
    const lesson = await DailyLesson.findOne({ day });

    if (!lesson) {
      return res.status(404).json({ success: false, message: `Day ${day} not found` });
    }

    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    next(error);
  }
};