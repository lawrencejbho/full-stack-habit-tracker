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
    id: req.body.id,
    notes: req.body.notes,
    timezone: req.body.timezone,
    timestamps: [],
  });
  habit.save();
};

const createMany = (req, res) => {
  HabitModel.insertMany(req.body.habitAddArray)
    .then(() => {
      console.log("added habits");
    })
    .catch((error) => {
      console.log(error);
    });
};

const getHabit = (req, res) => {
  HabitModel.find().then((entry) => {
    res.json(entry);
  });
};

const deleteHabit = (req, res) => {
  console.log(req.body);
  HabitModel.findOneAndDelete({ id: req.body.id }, (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("deleted: " + success);
    }
  });
};

const deleteMany = (req, res) => {
  console.log(req.body);
  HabitModel.deleteMany(req.body.habitDeleteArray)
    .then(() => {
      console.log("added habits");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.createHabit = createHabit;
exports.getHabit = getHabit;
exports.deleteHabit = deleteHabit;
exports.createMany = createMany;
exports.deleteMany = deleteMany;
