const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  username: String,
  habit_name: String,
  id: String,
  description: String,
  timezone: String,
  timestamps: [Number],
});

module.exports = habitSchema;
