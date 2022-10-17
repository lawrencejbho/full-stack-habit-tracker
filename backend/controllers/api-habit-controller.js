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
    today_timestamps: [],
  });
  habit.save();
};

const createMany = (req, res) => {
  console.log(req.body);
  HabitModel.insertMany(req.body)
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
  HabitModel.deleteMany({ id: { $in: req.body } })
    .then(() => {
      console.log("deleted habits");
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateTimestamps = (req, res) => {
  console.log(req.body);
  const filter = { habit_name: req.body.habit_name };
  const update = { today_timestamps: req.body.today_timestamps };
  HabitModel.findOneAndUpdate(filter, update)
    .then(() => {
      console.log("updated timestamps");
    })
    .catch((error) => {
      console.log(error);
    });
};

const pushTodayTimestamps = (req, res) => {
  HabitModel.find().then((entry) => {
    let timestamp_array = entry.map((habit) =>
      habit.timestamps.concat(habit.today_timestamps)
    );
    for (let i = 0; i < entry.length; i++) {
      let filter = { id: entry[i].id };
      let update = { timestamps: timestamp_array[i] };
      HabitModel.findOneAndUpdate(filter, update)
        .then(() => {
          console.log("pushed today_timestamps into timestamps");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};

exports.createHabit = createHabit;
exports.getHabit = getHabit;
exports.deleteHabit = deleteHabit;
exports.createMany = createMany;
exports.deleteMany = deleteMany;
exports.updateTimestamps = updateTimestamps;
exports.pushTodayTimestamps = pushTodayTimestamps;
