const express = require("express");

const apiWeatherController = require("../controllers/api-weather-controller");
const apiPomodoroController = require("../controllers/api-pomodoro-controller");
const apiHabitController = require("../controllers/api-habit-controller");

const router = express.Router();

// weather
router.get("/weather", apiWeatherController.getLatestWeather);

// pomodoro
router.get("/pomodoro-get", apiPomodoroController.getPomodoros);

router.post("/pomodoro-create-user", apiPomodoroController.createUser);

router.post("/pomodoro-add-pomodoros", apiPomodoroController.addPomodoros);

// calendar
router.post("/calendar-create", apiPomodoroController.createCalendar);

router.get("/calendar-update", apiPomodoroController.updateCalendar);

router.get("/calendar-get", apiPomodoroController.getCalendar);

// habit tracker
router.get("/habit-get", apiHabitController.getHabit);

router.post("/habit-create", apiHabitController.createHabit);

// router.post("/habit-update", apiHabitController.updateHabit);

router.post("/habit-delete", apiHabitController.deleteHabit);

module.exports = router;
