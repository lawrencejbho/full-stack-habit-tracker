const express = require("express");

const apiWeatherController = require("../controllers/api-weather-controller");
const apiPomodoroController = require("../controllers/api-pomodoro-controller");

const router = express.Router();

router.get("/weather", apiController.getLatestWeather);

router.get("pomodoro", apiWeatherController.getPomodoros);
module.exports = router;
