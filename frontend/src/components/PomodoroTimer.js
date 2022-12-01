import React from "react";

function PomodoroTimer(props) {
  function pomodoroActive() {
    if (props.type === "pomodoro") {
      if (props.activePomodoro) {
        return "Pause";
      } else {
        return props.startOrResume();
      }
    }

    if (props.type === "break") {
      if (props.activeBreak) {
        return "Pause";
      } else {
        return props.startOrResume();
      }
    }
  }

  function separateLogic() {
    if (props.type === "pomodoro") return props.activePomodoro;
    if (props.type === "break") return props.activeBreak;
    console.log(props.seconds);
  }

  return (
    <div className="pomodoro-box">
      <h1 className="white-text">{`${props.minutes}:${props.seconds}`}</h1>
      <button
        className={`timer-button-status-${
          separateLogic() ? "active" : "inactive"
        }`}
        onClick={
          props.minutes === "00" && props.seconds === "00"
            ? props.reset
            : props.toggle
        }
      >
        {pomodoroActive()}
      </button>
      <button className="timer-button" onClick={props.reset}>
        Reset
      </button>
    </div>
  );
}

export default PomodoroTimer;
