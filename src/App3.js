import React from "react";
import { Card, Grid, Button, makeStyles, Paper } from "@mui/material";
import randomColor from "randomcolor";

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
      {/* First paper will be the toolbar? */}
      <Paper elevation={10} style={{ background: randomColor() }}>
        <Grid container>
          <h1>Habit Tracker</h1>
        </Grid>
        <Grid container>
          <h3>{todayDateString}</h3>
        </Grid>
      </Paper>
      {/* Second paper is the app? */}
      <Paper elevation={20} style={{ background: randomColor() }}>
        <Card>first</Card>
        <Card>second</Card>
        <Card>third</Card>
        <Card>fourth</Card>
      </Paper>
    </div>
  );
}

export default App;
