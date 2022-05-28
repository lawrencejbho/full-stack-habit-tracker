import React, { useState } from "react";
import { nanoid } from "nanoid";

function Add(props) {
  const [habit, setHabit] = useState({
    id: nanoid(),
    body: "",
    counter: 1,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setHabit((previousHabit) => ({
      ...previousHabit,
      [name]: value,
    }));
  }

  function createNewHabit(event) {
    event.preventDefault();
    props.onAdd({ ...habit, id: nanoid() });
  }

  return (
    <div className="add">
      <form>
        <input
          type="body"
          name="body"
          placeholder="Add your habit here"
          onChange={handleChange}
          value={habit.body}
        />
        <button className="new-habit" onClick={createNewHabit}>
          +
        </button>
      </form>
    </div>
  );
}

export default Add;
