import React, { useState } from "react";
import { Card, Grid, Button, makeStyles, Paper } from "@mui/material";
import randomColor from "randomcolor";
import Habit from "./components/Habit.js";
import Add from "./components/Add.js";

function App() {
  const [habits, setHabits] = useState([]);

  return (
    <div>
      <main>
        {/* I think the card container will hold everything and it'll be separate from main for now */}
        <div className="card-container">
          <Add />
          <Habit value="value" />
          <Habit value="value" />
        </div>
      </main>
    </div>
  );
}

export default App;
