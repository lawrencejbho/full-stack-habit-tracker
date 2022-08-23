import React, { useState, useEffect } from "react";
import Habit from "./components/Habit.js";
import Add from "./components/Add.js";
import { nanoid } from "nanoid";
import Cafe from "./images/cafe.jpg";
import TodayDate from "./components/TodayDate.js";

function App() {
  // need to define localStorage here to grab the key habits
  const savedHabit = localStorage.getItem("habits");

  // our habits array that saves our habits to be displayed later, will use the localStorage if it exists
  const [habits, setHabits] = useState(() => JSON.parse(savedHabit) || []);

  // this help us track the current Habit Id, allows us to very easily track a Habit based on the ID
  const [currentHabitId, setCurrentHabitId] = useState(
    (habits[0] && habits[0].id) || ""
  );

  // useEffect will track any changes to habits array and modify the value in localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // checks for the proper ID and will increment it's counter value by 1
  function plusCounter() {
    setHabits((prevHabits) =>
      prevHabits.map((prevHabit) => {
        return prevHabit.id === currentHabitId
          ? { ...prevHabit, counter: prevHabit.counter + 1 }
          : prevHabit;
      })
    );
  }

  function minusCounter() {
    setHabits((prevHabits) =>
      prevHabits.map((prevHabit) => {
        return prevHabit.id === currentHabitId
          ? { ...prevHabit, counter: prevHabit.counter - 1 }
          : prevHabit;
      })
    );
  }

  // console.log(habits);

  // Pass this function to Add, it will pass us back the specific Habit so we can add the new habit into our Habits array
  function addHabit(newHabit) {
    setHabits((prevHabits) => {
      return [...prevHabits, newHabit];
    });
  }

  // Use filter to keep everything but the currentHabitId
  function deleteHabit(newHabit) {
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== currentHabitId)
    );
  }

  // not sure if this is the best way to apply the background image by doing it directly through style
  const backgroundStyle = {
    backgroundImage: `url(${Cafe})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div style={backgroundStyle}>
      <main>
        <div className="card-container">
          <Add onAdd={addHabit} setCurrentHabitId={setCurrentHabitId} />
          <Habit
            habits={habits}
            plusCounter={plusCounter}
            minusCounter={minusCounter}
            setCurrentHabitId={setCurrentHabitId}
            // deleteHabit={deleteHabit}
          />
          <TodayDate />
        </div>
      </main>
    </div>
  );
}

export default App;
