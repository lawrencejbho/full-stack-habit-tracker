const express = require("express");

const apiWeatherController = require("../controllers/api-weather-controller");
const apiPomodoroController = require("../controllers/api-pomodoro-controller");

const router = express.Router();

router.get("/weather", apiWeatherController.getLatestWeather);

router.get("/pomodoro-get", apiPomodoroController.getPomodoros);

router.post("/pomodoro-create-user", apiPomodoroController.createUser);

router.post("/pomodoro-add-pomodoros", apiPomodoroController.addPomodoros);

router.post("/calendar-create", apiPomodoroController.createCalendar);

module.exports = router;
