import React from "react";
import deleteIcon from "../images/delete.png";

function Delete(props) {
  return (
    <div
      className="delete"
      onClick={props.deleteClick}
      onMouseOver={props.mouseOver}
    >
      <img className="delete-icon" src={deleteIcon} alt="delete button" />
    </div>
  );
}

export default Delete;
