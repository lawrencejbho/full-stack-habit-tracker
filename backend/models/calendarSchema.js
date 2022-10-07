const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
  date: String,
  count: Number,
});

module.exports = calendarSchema;
