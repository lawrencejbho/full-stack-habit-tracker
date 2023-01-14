const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  user_id: String,
  counter_name: String,
  id: String,
  notes: String,
  timezone: String,
  timestamps: [Number],
});

module.exports = counterSchema;
