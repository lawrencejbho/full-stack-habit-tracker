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
  // console.log(req.body.habit_name);
  const filter = { habit_name: req.body.habit_name };
  const update = { timestamps: req.body.timestamps };
  HabitModel.findOneAndUpdate(filter, update)
    .then(() => {
      console.log("updated timestamps");
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateTodayTimestamps = (req, res) => {
  // console.log(req.body.habit_name);
  const filter = { habit_name: req.body.habit_name };
  const update = { today_timestamps: req.body.today_timestamps };
  HabitModel.findOneAndUpdate(filter, update)
    .then(() => {
      console.log("updated today_timestamps");
    })
    .catch((error) => {
      console.log(error);
    });
};

// find all habit entries, push in today_timestamps into timestamps, and then update each one individually
const pushTodayTimestamps = (req, res) => {
  HabitModel.find().then((entry) => {
    let timestamp_array = entry.map((habit) =>
      habit.timestamps.concat(habit.today_timestamps)
    );
    let statusCode = 404;

    for (let i = 0; i < entry.length; i++) {
      let today_array = entry[i].today_timestamps;
      if (today_array.length == 0) {
        console.log("nothing in the array");
      } else if (currentTime() - today_array[0] > 86400) {
        statusCode = 200;
        let filter = { id: entry[i].id };
        let update = { timestamps: timestamp_array[i] };
        HabitModel.findOneAndUpdate(filter, update)
          .then(() => {
            console.log("pushed today_timestamps into timestamps");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("still from today");
      }
    }
    res.sendStatus(statusCode);
  });
};

// same logic as push, but we just change today timestamps to be an empty array
const clearTodayTimestamps = (req, res) => {
  HabitModel.find().then((entry) => {
    for (let i = 0; i < entry.length; i++) {
      let filter = { id: entry[i].id };
      let update = { today_timestamps: [] };
      HabitModel.findOneAndUpdate(filter, update)
        .then(() => {
          console.log("cleared today_timestamps");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};

const currentTime = () => {
  const currentTime = new Date().getTime();
  return Math.floor(currentTime / 1000);
};

exports.createHabit = createHabit;
exports.getHabit = getHabit;
exports.deleteHabit = deleteHabit;
exports.createMany = createMany;
exports.deleteMany = deleteMany;
exports.updateTimestamps = updateTimestamps;
exports.updateTodayTimestamps = updateTodayTimestamps;
exports.pushTodayTimestamps = pushTodayTimestamps;
exports.clearTodayTimestamps = clearTodayTimestamps;
