const User = require('../models/User');

// @desc    Update user's last read day
// @route   PUT /api/progress
exports.updateProgress = async (req, res, next) => {
  try {
    const { day } = req.body;

    // Validate day
    if (!day || day < 1 || day > 30) {
      return res.status(400).json({ success: false, message: 'Please provide a valid day (1-30)' });
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { lastReadDay: day },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        lastReadDay: user.lastReadDay,
      },
    });
  } catch (error) {
    next(error);
  }
};