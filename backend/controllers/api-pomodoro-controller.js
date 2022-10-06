const HttpError = require("../models/http-error");
const bodyParser = require("body-parser");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE);
const pomodoroSchema = require("../models/pomodoroSchema");
const PomodoroModel = mongoose.model("PomodoroModel", pomodoroSchema);

const newUser = () => {
  const pomodoro = new PomodoroModel({
    user: "test-user",
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
    { user: "test-user1" },
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

exports.newUser = newUser;
exports.addPomodoros = addPomodoros;
exports.getPomodoros = getPomodoros;
