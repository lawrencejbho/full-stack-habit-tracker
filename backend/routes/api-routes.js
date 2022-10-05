const express = require("express");

const apiWeatherController = require("../controllers/api-weather-controller");
const apiPomodoroController = require("../controllers/api-pomodoro-controller");

const router = express.Router();

router.get("/weather", apiWeatherController.getLatestWeather);

router.get("/pomodoro-get", apiPomodoroController.getPomodoros);

router.post("/pomodoro-new-user", apiPomodoroController.newUser);

router.post("/pomodoro-add-pomodoros", apiPomodoroController.addPomodoros);

module.exports = router;
