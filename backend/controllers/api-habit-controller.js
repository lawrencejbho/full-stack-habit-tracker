const HttpError = require("../models/http-error");
const bodyParser = require("body-parser");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOATLAS, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const habitSchema = require("../models/habitSchema");
const HabitModel = mongoose.model("HabitModel", habitSchema);
const calendarSchema = require("../models/calendarSchema");
const CalendarModel = mongoose.model("CalendarModel", calendarSchema);

// this doesn't get used but it's helpful to see what is createMany doing
const createHabit = (req, res) => {
  console.log(req.body);
  const habit = new HabitModel({
    user_id: req.body.user_id,
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
  // console.log(req.body);
  HabitModel.insertMany(req.body)
    .then(() => {
      console.log("added habits");
    })
    .catch((error) => {
      console.log(error);
    });
};

const getHabit = (req, res) => {
  console.log(req.body);
  HabitModel.find({ user_id: req.body.user_id })
    .then((entry) => {
      // console.log(entry);
      res.json(entry);
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteHabit = (req, res) => {
  // console.log(req.body);
  HabitModel.findOneAndDelete({ id: req.body.id }, (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("deleted: " + success);
    }
  });
};

const deleteMany = (req, res) => {
  // console.log(req.body);
  HabitModel.deleteMany({ id: { $in: req.body } })
    .then(() => {
      console.log("deleted habits");
    })
    .catch((error) => {
      console.log(error);
    });
};

const addTimestamps = (req, res) => {
  // console.log(req.body);
  const filter = { habit_name: req.body.habit_name, user_id: req.body.user_id };
  const update = { $push: { timestamps: req.body.timestamps } };
  HabitModel.findOneAndUpdate(filter, update)
    .then(() => {
      console.log("added timestamps");
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateTimestamps = (req, res) => {
  // console.log(req.body);
  const filter = { habit_name: req.body.habit_name, user_id: req.body.user_id };
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
  // console.log(req.body);
  const filter = { habit_name: req.body.habit_name, user_id: req.body.user_id };
  const update = { today_timestamps: req.body.today_timestamps };
  HabitModel.findOneAndUpdate(filter, update)
    .then(() => {
      console.log("updated today timestamps");
      res.status(200);
    })
    .catch((error) => {
      console.log(error);
    });
};

// find all habit entries, push in today_timestamps into timestamps, and then update each one individually
// The logic on this works but is probably not optimal.  This runs anytime someone navigates to Habit Tracker, which probably is good enough but could push timestamps less than 1 day in.
// Probably should change it so that this runs at most once an hour versus every time someone goes to Habit Tracker.
const pushTodayTimestamps = (req, res) => {
  HabitModel.find().then((entry) => {
    let timestamp_array = entry.map((habit) =>
      habit.timestamps.concat(habit.today_timestamps)
    );
    let statusCode = 202;

    for (let i = 0; i < entry.length; i++) {
      let today_array = entry[i].today_timestamps;
      if (today_array.length == 0) {
        // console.log("nothing in the array");
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
        console.log("today_timestamps are still from today");
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

// create one document in the calendar collection first
const createCalendar = () => {
  const calendar = new CalendarModel({
    date: "January 1, 2022",
    count: 0,
    index: 1,
  });
  calendar.save();
};

// grab the last entry in the collection and then figure out if we need to add additional entries for the missing dates
// this can be used to populate the entire calendar collection when first creating the database after using createCalendar()
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
  // console.log("checking calendar");
  let unixTimeOfLastEntry = convertDateToUnixTime(timeOfLastEntry);
  let timeOffset = currentTime() - unixTimeOfLastEntry;
  let dateArray = [];
  let current_index = 1;
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
    dateArray.push({ date: date, count: 0, index: current_index });
    timeOffset -= 86400;
    current_index++;
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

exports.createHabit = createHabit;
exports.getHabit = getHabit;
exports.deleteHabit = deleteHabit;
exports.createMany = createMany;
exports.deleteMany = deleteMany;
exports.addTimestamps = addTimestamps;
exports.updateTimestamps = updateTimestamps;
exports.updateTodayTimestamps = updateTodayTimestamps;
exports.pushTodayTimestamps = pushTodayTimestamps;
exports.clearTodayTimestamps = clearTodayTimestamps;

exports.createCalendar = createCalendar;
exports.updateCalendar = updateCalendar;
exports.getCalendar = getCalendar;
