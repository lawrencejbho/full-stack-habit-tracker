const mongoose = require("mongoose");

const pomodoroSchema = new mongoose.Schema({
  user: String,
  timezone: Number,
  timestamps: [Number],
});

module.exports = pomodoroSchema;
