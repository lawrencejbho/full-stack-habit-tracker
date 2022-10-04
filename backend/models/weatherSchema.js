const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  time: Number,
  feels_like: String,
  description: String,
  wind: Number,
  sunrise: Number,
  sunset: Number,
});

module.exports = weatherSchema;
