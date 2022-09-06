import React, { useEffect, useState } from "react";
import "./timer.css";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // add a second every 1000 milliseconds
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // return clearInterval for clean up
  }, [isActive, seconds]);

  function toggle() {
    setIsActive((prev) => !prev);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  return (
    <div>
      <h1>Focus</h1>
      <hr></hr>
      <div>
        <h1>{seconds}</h1>
        <button
          className={`timer-button-status-${isActive ? "active" : "inactive"}`}
          onClick={toggle}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="timer-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
