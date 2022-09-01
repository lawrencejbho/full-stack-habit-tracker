import React from "react";
import deleteIcon from "../images/delete.png";

function Delete(props) {
  return (
    <div
      className="delete"
      onClick={props.deleteClick}
      onMouseOver={props.mouseOver}
    >
      <img className="delete-icon" src={deleteIcon} />
    </div>
  );
}

export default Delete;
