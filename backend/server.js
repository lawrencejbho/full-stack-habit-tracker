const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const axios = require("axios");
require("dotenv").config();

const habitRoutes = require("./routes/habit-routes.js");
const router = require("./routes/habit-routes.js");
// const otherRoutes = require("./routes/other-routes.js");
// const weatherRoutes = require("./routes/weather.js");

const app = express();

mongoose.connect(process.env.MONGOOSE);

const weatherSchema = new mongoose.Schema({
  time: Number,
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
    // console.log(response.data);
    const weather = new WeatherHour({
      time: response.data.dt,
      feels_like: response.data.main.feels_like,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
    });
    weather.save();
  });
  return weatherResponse;
};

// get current unix time and convert to seconds
const currentTime = () => {
  const currentTime = new Date().getTime();
  return currentTime / 1000;
};

// this will give us the newest/latest record
WeatherHour.find({})
  .sort({ _id: -1 })
  .limit(1)
  .then((weather) => {
    // compare currentTime with the latest record, if the difference is more than an hour we'll get a new record
    let difference = currentTime() - weather[0].time;
    if (difference > 3600) {
      console.log("getting new weather");
      newWeather();
    }
  });

app.use("/habit", habitRoutes);
// app.use("/other", otherRoutes);
// app.use("/weather", weatherRoutes);

// weather API, queries our database and returns the latest
app.get("/api/weather", function (req, res) {
  WeatherHour.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((weather) => {
      // compare currentTime with the latest record, if the difference is more than an hour we'll get a new record
      res.json(weather);
    });
});

// error handling middle ware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(5000);
