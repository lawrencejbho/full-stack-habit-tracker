const mongoose = require("mongoose");

const pomodoroSchema = new mongoose.Schema({
  user: String,
  timezone: Number,
  pomodoros: [Number],
});

module.exports = pomodoroSchema;
