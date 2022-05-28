import React from "react";

function Add(props) {
  return (
    <div className="add">
      <button className="new-note" onClick={props.newHabit}>
        +
      </button>
    </div>
  );
}

export default Add;
