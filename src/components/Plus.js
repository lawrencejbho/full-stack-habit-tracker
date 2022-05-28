import React from "react";

function Plus(props) {
  return (
    <div
      className="plus"
      onClick={props.plusClick}
      onMouseOver={props.mouseOver}
    >
      1
    </div>
  );
}

export default Plus;
