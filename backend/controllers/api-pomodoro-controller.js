const HttpError = require("../models/http-error");
const bodyParser = require("body-parser");
// const FakeData = require("./FakeChronologicalData");

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

const createCalendar = () => {
  const calendar = new CalendarModel({ date: "October 2, 2021", count: 0 });
  calendar.save();
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

exports.createUser = createUser;
exports.addPomodoros = addPomodoros;
exports.getPomodoros = getPomodoros;

exports.createCalendar = createCalendar;
