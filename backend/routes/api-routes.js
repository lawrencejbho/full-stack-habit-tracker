const express = require("express");

const apiWeatherController = require("../controllers/api-weather-controller");
const apiHabitController = require("../controllers/api-habit-controller");

const router = express.Router();

// weather
router.get("/weather", apiWeatherController.getLatestWeather);

// calendar
router.post("/calendar-create", apiHabitController.createCalendar);

router.get("/calendar-update", apiHabitController.updateCalendar);

router.get("/calendar-get", apiHabitController.getCalendar);

// habit tracker
router.get("/habit-get", apiHabitController.getHabit);

router.post("/habit-create", apiHabitController.createHabit);

router.post("/habit-create-many", apiHabitController.createMany);

// router.post("/habit-update", apiHabitController.updateHabit);

router.post("/habit-delete", apiHabitController.deleteHabit);

router.post("/habit-delete-many", apiHabitController.deleteMany);

router.post("/habit-add-timestamps", apiHabitController.addTimestamps);

router.post("/habit-update-timestamps", apiHabitController.updateTimestamps);

router.post(
  "/habit-update-today-timestamps",
  apiHabitController.updateTodayTimestamps
);

router.get(
  "/habit-push-today-timestamps",
  apiHabitController.pushTodayTimestamps
);

router.get(
  "/habit-clear-today-timestamps",
  apiHabitController.clearTodayTimestamps
);

module.exports = router;
