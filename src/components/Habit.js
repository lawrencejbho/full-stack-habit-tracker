import React, { useState } from "react";
import Plus from "./Plus.js";
import Minus from "./Minus.js";

function Habit() {
  const [counter, setCounter] = useState(0);

  function plusClick() {
    setCounter((prevValue) => prevValue + 1);
  }

  console.log(counter);

  return (
    <div className="habit-container">
      <Plus className="plus" plusClick={plusClick} />
      <div className="habit">{counter}</div>
      <Minus className="minus" />
    </div>
  );
}

export default Habit;
