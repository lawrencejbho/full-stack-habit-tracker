const express = require("express");

const apiWeatherController = require("../controllers/api-weather-controller");
const apiHabitController = require("../controllers/api-habit-controller");
const apiLandingController = require("../controllers/api-landing-controller");

const router = express.Router();

// weather
router.get("/weather", apiWeatherController.getLatestWeather);

// calendar
router.post("/calendar-create", apiHabitController.createCalendar);

router.get("/calendar-update", apiHabitController.updateCalendar);

router.get("/calendar-get", apiHabitController.getCalendar);

// habit tracker
router.post("/habit-get", apiHabitController.getHabit);

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

// counters

router.get("/counter-get", apiHabitController.getCounters);
router.post("/counter-create", apiHabitController.createCounter);
router.post("/counter-add-timestamp", apiHabitController.addCounterTimestamps);

// landing page

router.post("/create-email-object", apiLandingController.createEmailObject);
router.post("/add-new-email", apiLandingController.addNewEmail);

module.exports = router;
