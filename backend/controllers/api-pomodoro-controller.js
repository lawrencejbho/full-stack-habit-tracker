const HttpError = require("../models/http-error");
const bodyParser = require("body-parser");
// const EmptyCalendar = require("./EmptyCalendarData");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE);
const pomodoroSchema = require("../models/pomodoroSchema");
const PomodoroModel = mongoose.model("PomodoroModel", pomodoroSchema);
const calendarSchema = require("../models/calendarSchema");
const CalendarModel = mongoose.model("CalendarModel", calendarSchema);

const createUser = () => {
  const pomodoro = new PomodoroModel({
    date: "test-user",
    timezone: 10,
    pomodoros: [1664906719, 1664996419],
  });
  pomodoro.save();
};

const getPomodoros = (req, res) => {
  PomodoroModel.find({ user: "test-user" }).then((entry) => {
    console.log(entry);
    res.json(entry);
  });
};

const addPomodoros = (req, res, next) => {
  console.log(req.body);

  PomodoroModel.findOneAndUpdate(
    { user: "test-user" },
    { $push: { pomodoros: req.body.pomodoro } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
};

// create the blank calendar collection with one entry
const createCalendar = () => {
  const calendar = new CalendarModel({ date: "October 1, 2021", count: 0 });
  calendar.save();
};

// had to copy paste the array in EmptyCalendar into this insertMany function for it to update my collection
const updateCalendar = () => {
  CalendarModel.insertMany();
};

const getCalendar = (req, res, next) => {
  CalendarModel.find().then((entry) => res.json(entry));
};

exports.createUser = createUser;
exports.addPomodoros = addPomodoros;
exports.getPomodoros = getPomodoros;

exports.createCalendar = createCalendar;
exports.updateCalendar = updateCalendar;
exports.getCalendar = getCalendar;
