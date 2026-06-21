const mongoose = require('mongoose');

const DailyLessonSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  bibleChapters: {
    type: [String], // Array of strings, e.g., ["Matthew 5", "Luke 6"]
    required: true,
  },
  verses: {
    type: [String], // Array of actual verse texts
    required: true,
  },
  lesson: {
    type: String, // "What Jesus is asking us to learn"
    required: true,
  },
});

module.exports = mongoose.model('DailyLesson', DailyLessonSchema);