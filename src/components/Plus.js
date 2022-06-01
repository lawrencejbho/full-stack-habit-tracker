import React from "react";
import plusIcon from "../images/plus.png";

function Plus(props) {
  return (
    <div
      className="plus"
      onClick={props.plusClick}
      onMouseOver={props.mouseOver}
    >
      <img className="plus-icon" src={plusIcon} />
    </div>
  );
}

export default Plus;
