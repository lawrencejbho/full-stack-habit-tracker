import React, { useEffect, useState } from "react";
import PomodoroTimer from "./PomodoroTimer.js";
import "./pomodoro.css";

function Pomodoro() {
  const [secondsPomodoro, setSecondsPomodoro] = useState(11);
  const [secondsBreak, setSecondsBreak] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const pomodoroTimeDisplay = timeConversion(secondsPomodoro);
  const breakTimeDisplay = timeConversion(secondsBreak);

  let isPomodoro = false;

  // not sure if this is the proper way to do this but I leave seconds as the state variable and use a normal variable that uses seconds with derived state
  function timeConversion(seconds) {
    let time = {};
    if (seconds > 0) {
      time = {
        minutes:
          Math.floor(seconds / 60) > 10
            ? Math.floor(seconds / 60)
            : `0${Math.floor(seconds / 60)}`,
        seconds: seconds % 60 >= 10 ? seconds % 60 : `0${seconds % 60}`,
      };
    } else if (seconds === 0) {
      time = {
        minutes: "00",
        seconds: "00",
      };
    }
    return time;
  }

  useEffect(() => {
    let interval = null;

    function timerFinished() {
      console.log("it's over");
      notificationPermission();
      isPomodoro = true;
    }

    if (isActive && secondsPomodoro !== 0) {
      interval = setInterval(() => {
        setSecondsPomodoro((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && secondsPomodoro !== 0) {
      clearInterval(interval);
    } else if (secondsPomodoro === 0) {
      timerFinished();
    }
    return () => clearInterval(interval); // return clearInterval for clean up
  }, [isActive, secondsPomodoro]);

  // local notifications

  function notificationPermission() {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        const notification = new Notification("Pomodoro Finished", {
          body: "Start Break?",
          data: { test: "Data" },
          icon: "mango.png",
        });
        // click the notification to immediately start break
        notification.addEventListener("click", (e) => {
          // console.log(e);
          startBreak();
        });
      }
    });
  }

  function toggle() {
    setIsActive((prev) => !prev);
  }

  function reset() {
    setSecondsPomodoro(1500);
    setSecondsBreak(300);
    setIsActive(false);
    isPomodoro = false;
  }

  // this seems to work for which one to display, I also tried checking for isActive but it didn't work as intended
  function startOrResume() {
    if (secondsPomodoro === 1500) {
      return "Start";
    } else {
      return "Resume";
    }
  }

  function startBreak() {
    setSecondsPomodoro(300);
    setIsActive(true);
  }

  return (
    <div>
      <h1 className="white-text">Pomodoro</h1>
      <hr className="app-line"></hr>
      <div className="timer-container">
        <PomodoroTimer
          minutes={pomodoroTimeDisplay.minutes}
          seconds={pomodoroTimeDisplay.seconds}
          active={isActive}
          toggle={toggle}
          reset={reset}
          startOrResume={startOrResume}
          type="pomodoro"
        />
        <PomodoroTimer
          minutes={breakTimeDisplay.minutes}
          seconds={breakTimeDisplay.seconds}
          active={isActive}
          toggle={toggle}
          reset={reset}
          startOrResume={startOrResume}
          type="break"
        />
      </div>
    </div>
  );
}

export default Pomodoro;
