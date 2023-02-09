import React, { useState } from "react";
import { nanoid } from "nanoid";

function Add(props) {
  // this is the new habit before it gets added into our habits array
  const [habit, setHabit] = useState({
    id: nanoid(),
    habit_name: "",
    counter: 0,
  });

  // this helps us update the habit's value when a change is made to input
  function handleChange(event) {
    const { name, value } = event.target;
    setHabit((previousHabit) => ({
      ...previousHabit,
      [name]: value,
    }));
  }

  // when submitting, we add the current habit to the habits array with a new id
  // prevent Default to prevent refreshing the page when submitting
  function createNewHabit(event) {
    // keep in mind that there is only 1 object in the habit variable for this component

    const newID = nanoid();

    event.preventDefault();
    // we need to add the object in this way to make the website more snappy
    // this gets passed into the parent component HabitTracker
    props.onAdd({
      user_id: props.userId,
      habit_name: habit.habit_name,
      id: newID,
      notes: "notes",
      timezone: "PST",
      timestamps: [],
      today_timestamps: [],
      counter: 0,
    });
  }

  return (
    <div className="add">
      <form>
        <input
          type="body"
          name="habit_name"
          placeholder="Add your habit here"
          onChange={handleChange}
          value={habit.body}
          className="habit-add-input"
        />
        <button
          className="habit-new-habit tw-cursor-pointer"
          onClick={createNewHabit}
        >
          +
        </button>
      </form>
    </div>
  );
}

export default Add;
