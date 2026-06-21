const mongoose = require('mongoose');
const dotenv = require('dotenv');
const DailyLesson = require('./models/DailyLesson');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

// Helper to split "John 1–2" into ["John 1", "John 2"]
const splitChapters = (range) => {
  const parts = range.split('–');
  if (parts.length === 1) return [parts[0].trim()];
  
  const book = parts[0].replace(/\d+$/, '').trim(); // Extracts "John" from "John 13"
  const start = parseInt(parts[0].match(/\d+$/)[0]);
  const end = parseInt(parts[1].match(/\d+$/)[0]);
  const chapters = [];
  for (let i = start; i <= end; i++) {
    chapters.push(`${book} ${i}`);
  }
  return chapters;
};

const lessons = [
  // Week 1 – Gospel of John
  { day: 1, chapters: "John 1–2", title: "The Word Made Flesh" },
  { day: 2, chapters: "John 3–4", title: "Born Again & Living Water" },
  { day: 3, chapters: "John 5–6", title: "Bread of Life" },
  { day: 4, chapters: "John 7–8", title: "Truth & Light of the World" },
  { day: 5, chapters: "John 9–10", title: "Good Shepherd" },
  { day: 6, chapters: "John 11–12", title: "Raising Lazarus & Humility" },
  { day: 7, chapters: "John 13–21", title: "Love, Last Supper, Crucifixion & Resurrection" },

  // Week 2 – Matthew
  { day: 8, chapters: "Matthew 1–4", title: "Kingdom of Heaven" },
  { day: 9, chapters: "Matthew 5", title: "Sermon on the Mount (Part 1)" },
  { day: 10, chapters: "Matthew 6", title: "Prayer, Fasting, Trusting God" },
  { day: 11, chapters: "Matthew 7", title: "Judging & Building on the Rock" },
  { day: 12, chapters: "Matthew 8–10", title: "Faith & Discipleship" },
  { day: 13, chapters: "Matthew 11–13", title: "Parables & Kingdom of God" },
  { day: 14, chapters: "Matthew 14–28", title: "Forgiveness, End Times, Passion & Resurrection" },

  // Week 3 – Luke
  { day: 15, chapters: "Luke 1–4", title: "Luke 1–4" },
  { day: 16, chapters: "Luke 5–8", title: "Luke 5–8" },
  { day: 17, chapters: "Luke 9–12", title: "Luke 9–12" },
  { day: 18, chapters: "Luke 13–15", title: "Prodigal Son & Lost Sheep" },
  { day: 19, chapters: "Luke 16–18", title: "Rich Man, Lazarus & Persistent Prayer" },
  { day: 20, chapters: "Luke 19–21", title: "Luke 19–21" },
  { day: 21, chapters: "Luke 22–24", title: "Passion & Resurrection (Luke)" },

  // Week 4 – Mark & Reflection
  { day: 22, chapters: "Mark 1–4", title: "Mark 1–4" },
  { day: 23, chapters: "Mark 5–8", title: "Mark 5–8" },
  { day: 24, chapters: "Mark 9–12", title: "Mark 9–12" },
  { day: 25, chapters: "Mark 13–16", title: "Mark 13–16" },
  { day: 26, chapters: "Matthew 5–7", title: "Re-read Sermon on the Mount" },
  { day: 27, chapters: "John 13–17", title: "Re-read Love, Holy Spirit, Prayer" },
  { day: 28, chapters: "Luke 15", title: "Re-read God's Mercy" },
  { day: 29, chapters: "Matthew 24–25", title: "Readiness & Final Judgment" },
  { day: 30, chapters: "John 20–21", title: "Victory & Prayer" },
];

const seedDB = async () => {
  try {
    // Delete old dummy data
    await DailyLesson.deleteMany({});
    console.log('🗑️ Old data cleared.');

    // Prepare the data for insertion
    const formattedLessons = lessons.map((item) => {
      const bibleChapters = splitChapters(item.chapters);
      return {
        day: item.day,
        title: item.title,
        bibleChapters: bibleChapters,
        // Leave verses empty for now, or add 1-2 key verses if you have them
        verses: [`Read ${item.chapters} prayerfully.`],
        // ⚠️ IMPORTANT: Replace this placeholder with your actual "What Jesus asks" lesson
        lesson: `[Placeholder] Reflection for Day ${item.day} - Jesus reveals His heart through ${item.chapters}. (You will replace this text later with your actual teaching.)`,
      };
    });

    await DailyLesson.insertMany(formattedLessons);
    console.log(`✅ ${formattedLessons.length} Days seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedDB();