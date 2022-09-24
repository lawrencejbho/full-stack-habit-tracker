import React from "react";
import minusIcon from "../images/minus.png";

function Minus(props) {
  return (
    <div
      className="minus"
      onClick={props.minusClick}
      onMouseOver={props.mouseOver}
    >
      <img className="minus-icon" src={minusIcon} alt="minus icon" />
    </div>
  );
}

export default Minus;
