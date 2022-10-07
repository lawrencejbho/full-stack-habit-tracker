import React, { useState, useEffect } from "react";

function Weather() {
  // I'm currently using the not one by one call API, so will change it when I get back to this
  // currently missing the uv index
  // TODO - might want to have different images based on the weather itself - like if it's windy it has a jacket
  const [weatherData, setWeatherData] = useState([{}]);
  const api = "/api/weather";

  useEffect(() => {
    async function getWeather() {
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          return setWeatherData(data);
        });
    }
    getWeather();
    // console.log(weatherData[0].time);
  }, []);

  // basic wind logic
  function windLogic(windData) {
    if (windData > 15 && windData < 25) {
      return "pretty windy";
    } else if (windData > 25) {
      return "very windy";
    } else if (windData > 10 && windData < 15) {
      return "kinda windy";
    } else {
      return "not windy";
    }
  }

  //convert from unix to date
  function convertToTime(unix_date) {
    let period = "am";
    const date = new Date(unix_date * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const string = `${convertHours(hours)}:${padTo2Digits(minutes)} ${period}`;
    return string;

    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }
    function convertHours(num) {
      if (num > 12) {
        num = num % 12;
        period = "pm";
      }
      return num;
    }
  }

  return (
    <>
      <p className="white-text">{weatherData[0].feels_like}</p>
      <p className="white-text">{weatherData[0].description}</p>
      <p className="white-text">{windLogic(weatherData[0].wind)}</p>
      <p className="white-text">{convertToTime(weatherData[0].sunrise)}</p>
      <p className="white-text">{convertToTime(weatherData[0].sunset)}</p>
    </>
  );
}

export default Weather;
