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
    // console.log(entry);
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

// had to copy paste the array in EmptyCalendar into this insertMany function for it to update my collection when first making the 365 day calendar
// grab the last entry in the collection and then figure out if we need to add additional entries for the missing dates
const updateCalendar = () => {
  //   CalendarModel.insertMany();
  const timeOfLastEntry = CalendarModel.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((entry) => {
      calculateOffset(entry[0].date);
    });
  timeOfLastEntry;
};

// calculate the offset and if it's greater than a day, then we'll add the additional days into an array to be added
const calculateOffset = (timeOfLastEntry) => {
  console.log("checking calendar");
  let unixTimeOfLastEntry = convertDateToUnixTime(timeOfLastEntry);
  let timeOffset = currentTime() - unixTimeOfLastEntry;
  let dateArray = [];
  while (timeOffset > 86400) {
    unixTimeOfLastEntry = unixTimeOfLastEntry + 86400;
    const date = new Date(unixTimeOfLastEntry * 1000).toLocaleDateString(
      "en-us",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    // console.log(date);
    dateArray.push({ date: date, count: 0 });
    timeOffset -= 86400;
  }
  if (dateArray.length !== 0) {
    console.log("updating calendar");
    CalendarModel.insertMany(dateArray);
  }
};

const getCalendar = (req, res, next) => {
  CalendarModel.find().then((entry) => res.json(entry));
};

const convertDateToUnixTime = (dateString) => {
  const date = new Date(dateString);
  return date.getTime() / 1000;
};

const currentTime = () => {
  const currentTime = new Date().getTime();
  return Math.floor(currentTime / 1000);
};

exports.createUser = createUser;
exports.addPomodoros = addPomodoros;
exports.getPomodoros = getPomodoros;

exports.createCalendar = createCalendar;
exports.updateCalendar = updateCalendar;
exports.getCalendar = getCalendar;
