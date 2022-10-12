import React, { useState } from "react";
import { nanoid } from "nanoid";

function Add(props) {
  // this is the new habit before it gets added into our habits array
  const [habit, setHabit] = useState({
    id: nanoid(),
    body: "",
    counter: 0,
  });

  // this helps us update the habit's body when a change is made to input
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
    event.preventDefault();
    props.onAdd({ ...habit, id: nanoid() });
  }

  // async function createHabit(event) {
  //   let data = {
  //     username: "test-user",
  //     habit_name: event.target.habit_name,
  //     description: event.target.description,
  //     timezone: "PST",
  //   };
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   };

  //   fetch("/api/habit-create", requestOptions).then((response) => {
  //     console.log(response)
  //     return response.json()
  //   })
  // }

  async function createHabit(event) {
    let data = {
      username: "test-user",
      habit_name: "test",
      id: nanoid(),
      description: "test",
      timezone: "PST",
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("/api/habit-create", requestOptions).then((response) => {
      console.log(response);
      return response.json();
    });
  }

  createHabit();

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
