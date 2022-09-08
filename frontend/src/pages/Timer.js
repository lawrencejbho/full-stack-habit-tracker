import React, { useEffect, useState } from "react";
import "./timer.css";

function Timer() {
  const [seconds, setSeconds] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const timeDisplay = timeConversion();
  let isPomodoro = false;

  // not sure if this is the proper way to do this but I leave seconds as the state variable and use a normal variable that uses seconds with derived state
  function timeConversion() {
    let time = {};
    if (seconds > 0) {
      time = {
        minutes:
          Math.floor(seconds / 60) > 10
            ? Math.floor(seconds / 60)
            : `0${Math.floor(seconds / 60)}`,
        seconds: seconds % 60 > 10 ? seconds % 60 : `0${seconds % 60}`,
      };
    } else if (seconds === 0) {
      time = {
        minutes: "00",
        seconds: "00",
      };
    }
    return time;
  }

  // subtract a second every 1000 milliseconds
  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setSeconds((seconds) => {
  //         if (seconds > 0) {
  //           return seconds - 1;
  //         } else {
  //           timerFinished();
  //           return seconds;
  //         }
  //       });
  //     }, 1000);
  //   } else if (!isActive && seconds !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval); // return clearInterval for clean up
  // }, [isActive, seconds]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds !== 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    } else if (seconds === 0) {
      timerFinished();
    }
    return () => clearInterval(interval); // return clearInterval for clean up
  }, [isActive, seconds]);

  function toggle() {
    setIsActive((prev) => !prev);
  }

  function timerFinished() {
    console.log("it's over");
    isPomodoro = true;
  }

  function reset() {
    setSeconds(1500);
    setIsActive(false);
    isPomodoro = false;
  }

  // this seems to work for which one to display, I also tried checking for isActive but it didn't work as intended
  function startOrResume() {
    if (seconds === 1500) {
      return "Start";
    } else {
      return "Resume";
    }
  }

  function startBreak() {
    setSeconds(300);
    setIsActive(true);
  }

  return (
    <div>
      <h1 className="white-text">Pomodoro</h1>
      <hr className="app-line"></hr>
      <div>
        <h1 className="white-text">
          {`${timeDisplay.minutes}:${timeDisplay.seconds}`}
        </h1>
        <button
          className={`timer-button-status-${isActive ? "active" : "inactive"}`}
          onClick={toggle}
        >
          {isActive ? "Pause" : startOrResume()}
        </button>
        <button className="timer-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
