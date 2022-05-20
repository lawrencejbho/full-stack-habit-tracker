import React from "react";
import { Card, Paper, Grid } from "@mui/material";

function App() {
  //code to get the date, use an array of months, and display the date as a string
  // TODO in the future you'll probably need to initialize this in state
  // TODO will also need a way to store this into an object so that we can store for analytics
  let date = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const todayDateString = `${
    month[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;

  return (
    <div>
      <h1> Habit Tracker </h1>
      {todayDateString}
    </div>
  );
}

export default App;
