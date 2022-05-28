import React, { useEffect, useState } from "react";
import { Card, Grid, Button, makeStyles, Paper } from "@mui/material";
import randomColor from "randomcolor";
import Habit from "./components/Habit.js";
import Add from "./components/Add.js";
import { nanoid } from "nanoid";

function App() {
  // using localStorage here - uses one key habit_name
  const savedHabit = localStorage.getItem("habit_name");

  // set the initial value to be our localStorage savedHabit, otherwise use an empty array
  const [habits, setHabits] = useState(() => JSON.parse(savedHabit) || []);

  // help us track the current Habit Id
  // ! may not need this actually
  const [currentHabitId, setCurrentHabitId] = useState(
    (habits[0] && habits[0].id) || ""
  );

  // useEffect will track any changes to habits and modify the value in localStorage
  useEffect(() => {
    localStorage.setItem("habit_name", JSON.stringify(habits));
  }, [habits]);

  // use nanoid here to create a unique string ID generator
  function createNewHabit() {
    const newHabit = {
      id: nanoid(),
      body: "Type your new habit here",
      counter: 1,
    };
    // set the new Habit to be first in the array
    setHabits((prevHabits) => [newHabit, ...prevHabits]);
  }

  console.log(currentHabitId);

  // when a change is made, it will map through the habits array, if the id matches the current ID
  // then it will modify the body of our habit with the new text
  // ! I think this will need to be changed in the future as I'm not sure if you want it to freely modify the habit
  function updateHabit(text) {
    setHabits((prevHabits) =>
      prevHabits.map((prevHabit) => {
        return prevHabit.id === currentHabitId
          ? { ...prevHabit, body: text }
          : prevHabit;
      })
    );
  }

  // ! not sure if this is needed
  function findCurrentId() {
    return (
      habits.find((habit) => {
        return habit.id === currentHabitId;
      }) || habits[0]
    );
  }

  // makes it so that each habit has an key for the counter, this will increment the counter by 1
  function plusCounter() {
    setHabits((prevHabits) =>
      prevHabits.map((prevHabit) => {
        return prevHabit.id === currentHabitId
          ? { ...prevHabit, counter: prevHabit.counter + 1 }
          : prevHabit;
      })
    );
  }

  return (
    <div>
      <main>
        {/* I think the card container will hold everything and it'll be separate from main for now */}
        <div className="card-container">
          <input type="text" placeholder="Add your habit here"></input>
          <Add
            newHabit={createNewHabit}
            setCurrentHabitId={setCurrentHabitId}
            currentId={findCurrentId()}
          />
          <Habit
            value="value"
            habits={habits}
            plusCounter={plusCounter}
            setCurrentHabitId={setCurrentHabitId}
            currentId={findCurrentId()}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
