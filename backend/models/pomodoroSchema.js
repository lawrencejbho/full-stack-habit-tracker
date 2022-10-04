const mongoose = require("mongoose");

const pomodoroSchema = new mongoose.Schema({
  timezone: Number,
  pomodoros: [Number],
});

module.exports = pomodoroSchema;
