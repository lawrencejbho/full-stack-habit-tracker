const mongoose = require("mongoose");

// I'm not sure why but mongoose will throw username errors if it isn't defined here in the schema.  May be related to using passport.

const userSchema = new mongoose.Schema({
  profileId: String,
  username: String,
  password: String,
});

module.exports = userSchema;
