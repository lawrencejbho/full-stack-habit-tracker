import React from "react";

function Pomodoro(props) {
  return (
    <div className="pomodoro-box">
      <h1 className="white-text">{`${props.minutes}:${props.seconds}`}</h1>
      <button
        className={`timer-button-status-${
          props.active ? "active" : "inactive"
        }`}
        onClick={props.toggle}
      >
        {props.active ? "Pause" : props.startOrResume()}
      </button>
      <button className="timer-button" onClick={props.reset}>
        Reset
      </button>
    </div>
  );
}

export default Pomodoro;
