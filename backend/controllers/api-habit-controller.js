const HttpError = require("../models/http-error");
const bodyParser = require("body-parser");
// const EmptyCalendar = require("./EmptyCalendarData");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE);

const habitSchema = require("../models/habitSchema");
const HabitModel = mongoose.model("HabitModel", habitSchema);

const createHabit = (req, res) => {
  console.log(req.body);
  const habit = new HabitModel({
    username: req.body.username,
    habit_name: req.body.habit_name,
    description: " ",
    timezone: req.body.timezone,
    timestamps: [],
  });
  habit.save();
};

exports.createHabit = createHabit;
