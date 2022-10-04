const HttpError = require("../models/http-error");
require("dotenv").config();
const axios = require("axios");
const cron = require("node-cron");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE);
const weatherSchema = require("../models/weatherSchema");
const WeatherHour = mongoose.model("WeatherHour", weatherSchema);

const weatherAPI = process.env.WEATHER_API;
const weatherLAT = process.env.WEATHER_LAT;
const weatherLON = process.env.WEATHER_LON;
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${weatherLAT}&lon=${weatherLON}&appid=${weatherAPI}&units=imperial`;

// saving to our database
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

// compare currentTime with the latest record, if the difference is more than an hour we'll get a new record
const checkLastWeather = (time) => {
  let difference = currentTime() - time;
  if (difference > 3600) {
    console.log("getting new weather");
    newWeather();
  }
};

const getLatestWeather = (req, res) => {
  // this will give us the newest/latest record
  WeatherHour.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((weather) => {
      // probably not the right place to put this, but can run a check if we do query the weather api
      checkLastWeather(weather[0].time);
      res.json(weather);
    });
};

// cron schedule to query ever hour
const task = cron.schedule("0 */1 * * *", () => {
  console.log("run every hour");
  // this will give us the newest/latest record
  WeatherHour.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((weather) => {
      checkLastWeather(weather[0].time);
    });
});

task.start();

exports.getLatestWeather = getLatestWeather;
