const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  username: String,
  habit_name: String,
  id: String,
  notes: String,
  timezone: String,
  timestamps: [Number],
  counter: Number,
});

module.exports = habitSchema;
