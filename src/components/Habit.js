import React, { useState } from "react";
import Plus from "./Plus.js";
import Minus from "./Minus.js";

function Habit(props) {
  // map through the habits to create each one with its unique habit keys
  const habitElements = props.habits.map((habit, index) => (
    <div key={habit.id} className="habit-container">
      <Plus
        className="plus"
        // Anytime we mouseOver, we will modify the currentHabitID so that we can update the counter when it is clicked
        // it looks like you need to an arrow function anytime you are passing a parameter to an event handler or callback
        // this is equivalent to using a .bind
        mouseOver={() => props.setCurrentHabitId(habit.id)}
        plusClick={props.plusCounter}
      />

      <div className="habit">
        {habit.counter}
        {habit.body}
        <button className="delete-btn">
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
      <Minus className="minus" />
    </div>
  ));

  // ? honestly not show what this div habit group does or if I even need it
  return <div className="habit-group">{habitElements}</div>;
}

export default Habit;
