import React, { useEffect, useState } from "react";
import randomColor from "randomcolor";
import Habit from "./components/Habit.js";
import Add from "./components/Add.js";
import { nanoid } from "nanoid";

function App() {
  const [habits, setHabits] = useState({
    id: 1,
    body: "",
    counter: 1,
  });

  // help us track the current Habit Id
  const [currentHabitId, setCurrentHabitId] = useState(
    (habits[0] && habits[0].id) || ""
  );

  // use nanoid here to create a unique string ID generator
  function createNewHabit(event) {
    const myValue = event.target.value;
    const newHabit = {
      id: nanoid(),
      body: myValue,
      counter: 1,
    };
    // set the new Habit to be first in the array
    setHabits((prevHabits) => [newHabit, ...prevHabits]);
    event.preventDefault();
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

  console.log(habits);

  function handleChange(event) {
    const { name, value } = event.target;
    setHabits((previousHabit) => ({
      ...previousHabit,
      [name]: value,
    }));
  }

  return (
    <div>
      <main>
        <div className="card-container">
          <form>
            <input
              name="body"
              placeholder="Add your habit here"
              onChange={handleChange}
              value={habits.body}
            />
            <Add
              newHabit={createNewHabit}
              setCurrentHabitId={setCurrentHabitId}
            />
          </form>
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
