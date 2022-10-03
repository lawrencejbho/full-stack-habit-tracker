const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const axios = require("axios");
require("dotenv").config();

const habitRoutes = require("./routes/habit-routes.js");
const otherRoutes = require("./routes/habit-routes.js");

const app = express();

// mongoose for weather
mongoose.connect("mongodb://localhost:27017/habitTrackerDB");

const weatherSchema = new mongoose.Schema({
  day: Number,
  feels_like: String,
  description: String,
  wind: Number,
  sunrise: Number,
  sunset: Number,
});

const WeatherHour = mongoose.model("WeatherHour", weatherSchema);

const weatherAPI = process.env.WEATHER_API;
const url = `https://api.openweathermap.org/data/2.5/weather?lat=37.7621407&lon=-122.4745359&appid=${weatherAPI}&units=imperial`;

const newWeather = async () => {
  const weatherResponse = await axios.get(url).then((response) => {
    console.log(response.data.dt);
    const weather = new WeatherHour({
      day: response.data.dt,
      feels_like: response.data.main[0],
      description: "test2",
      wind: 1,
      sunrise: 1,
      sunset: 1,
    });
    weather.save();
  });
  return weatherResponse;
};

newWeather();

app.use("/habit", habitRoutes);
app.use("/other", otherRoutes);

// error handling middle ware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(5000);
