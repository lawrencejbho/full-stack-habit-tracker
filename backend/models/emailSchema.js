const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: String,
});

module.exports = emailSchema;
