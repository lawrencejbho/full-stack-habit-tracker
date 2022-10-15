import React from "react";
import Plus from "./Plus.js";
import Minus from "./Minus.js";
import HabitDelete from "./Habit-Delete.js";

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
        {habit.today_timestamps.length} {habit.habit_name}
        <HabitDelete
          mouseOver={() => props.setCurrentHabitId(habit.id)}
          deleteClick={props.deleteHabit}
        />
        <button className="delete-btn"></button>
      </div>
      <Minus
        className="minus"
        mouseOver={() => props.setCurrentHabitId(habit.id)}
        minusClick={props.minusCounter}
      />
    </div>
  ));

  // ? honestly not show what this div habit group does or if I even need it
  return <div className="habit-group">{habitElements}</div>;
}

// function Habit(props) {
//   // map through the habits to create each one with its unique habit keys
//   const habitElements = props.habits.map((habit, index) => (
//     <div key={habit.id} className="habit-container">
//       <Plus
//         className="plus"
//         // Anytime we mouseOver, we will modify the currentHabitID so that we can update the counter when it is clicked
//         // it looks like you need to an arrow function anytime you are passing a parameter to an event handler or callback
//         // this is equivalent to using a .bind
//         mouseOver={() => props.setCurrentHabitId(habit.id)}
//         plusClick={props.plusCounter}
//       />

//       <div className="habit">
//         {habit.counter} {habit.habit_name}
//         <HabitDelete
//           mouseOver={() => props.setCurrentHabitId(habit.id)}
//           deleteClick={props.deleteHabit}
//         />
//         <button className="delete-btn"></button>
//       </div>
//       <Minus
//         className="minus"
//         mouseOver={() => props.setCurrentHabitId(habit.id)}
//         minusClick={props.minusCounter}
//       />
//     </div>
//   ));

//   // ? honestly not show what this div habit group does or if I even need it
//   return <div className="habit-group">{habitElements}</div>;
// }

export default Habit;
