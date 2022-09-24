import React, { useState, useEffect } from "react";

function Weather() {
  // this API needs to start as an object
  const [weatherData, setWeatherData] = useState({});
  const [ready, setReady] = useState(false);
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=37.7621407&lon=-122.4745359&appid=6d794b4b65ee6ae6ad174f26bb0daf29&units=imperial";

  useEffect(() => {
    getWeather();
  }, []);

  async function getWeather() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return setWeatherData(data);
      });
  }

  // wind logic
  let wind = "not windy";
  if (weatherData.wind > 15 && weatherData.wind < 25) {
    wind = "kinda windy";
  } else if (weatherData.wind > 25) {
    wind = "very windy";
  } else {
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
      <p className="white-text">
        {weatherData.timezone && weatherData.main.feels_like}
      </p>
      <p className="white-text">
        {weatherData.timezone && weatherData.weather[0].description}
      </p>
      <p className="white-text">{wind}</p>
      <p className="white-text">
        {weatherData.timezone && convertToTime(weatherData.sys.sunrise)}
      </p>
      <p className="white-text">
        {weatherData.timezone && convertToTime(weatherData.sys.sunset)}
      </p>
    </>
  );
}

export default Weather;
