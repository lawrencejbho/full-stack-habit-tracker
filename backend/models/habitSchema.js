const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  username: String,
  habit_name: String,
  description: String,
  timezone: Number,
  timestamps: [Number],
});

module.exports = habitSchema;
