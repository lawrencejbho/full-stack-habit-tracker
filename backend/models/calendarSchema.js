const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
  date: String,
  count: Number,
  index: Number,
});

module.exports = calendarSchema;
