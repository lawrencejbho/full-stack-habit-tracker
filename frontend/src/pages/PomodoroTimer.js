import React from "react";

function PomodoroTimer(props) {
  function pomodoroActive() {
    if (props.activePomodoro) {
      if (props.type === "pomodoro") {
        return "Pause";
      } else if (props.type === "break") {
        return props.startOrResume();
      }
    } else {
      return props.startOrResume();
    }
  }

  function separateLogic() {
    if (props.type === "pomodoro") return props.activePomodoro;
    if (props.type === "break") return props.activeBreak;
  }

  return (
    <div className="pomodoro-box">
      <h1 className="white-text">{`${props.minutes}:${props.seconds}`}</h1>
      <button
        className={`timer-button-status-${
          separateLogic() ? "active" : "inactive"
        }`}
        onClick={props.toggle}
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
