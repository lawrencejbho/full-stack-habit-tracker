const express = require("express");

const apiController = require("../controllers/api-controller");

const router = express.Router();

router.get("/weather", apiController.getLatestWeather);

module.exports = router;
