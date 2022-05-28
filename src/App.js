import React, { useState } from "react";
import Habit from "./components/Habit.js";
import Add from "./components/Add.js";
import { nanoid } from "nanoid";

function App() {
  // our habits array that saves our habits to be displayed
  const [habits, setHabits] = useState([]);
  // help us track the current Habit Id
  const [currentHabitId, setCurrentHabitId] = useState(
    (habits[0] && habits[0].id) || ""
  );

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

  console.log(habits);

  // need to pass this function so that we can pass the note we created back to App
  function addHabit(newHabit) {
    setHabits((prevHabits) => {
      return [...prevHabits, newHabit];
    });
  }

  return (
    <div>
      <main>
        <div className="card-container">
          <Add onAdd={addHabit} setCurrentHabitId={setCurrentHabitId} />
          <Habit
            habits={habits}
            plusCounter={plusCounter}
            setCurrentHabitId={setCurrentHabitId}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
