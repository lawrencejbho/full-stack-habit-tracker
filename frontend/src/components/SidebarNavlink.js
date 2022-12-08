import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

/* 
I was having trouble with using styling or className with Navlink to show a different style on the active path.  So I switched to using useLocation and it works pretty well 
*/

function SidebarNavlink(props) {
  const [mouseHover, setMouseHover] = useState(false);

  const handleMouseOver = () => {
    setMouseHover(true);
  };

  const handleMouseOut = () => {
    setMouseHover(false);
  };

  const location = useLocation();

  const { pathname } = location;

  function style() {
    if (pathname == props.path) {
      return { backgroundColor: "#D0E1E9" };
    }
    return { backgroundColor: mouseHover ? "#D0E1E9" : undefined };
  }

  return (
    <>
      <NavLink to={props.path}>
        <div
          className="sidebar-list-block"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          style={style()}
        >
          <img
            className="sidebar-habittracker-icon"
            src={props.image}
            alt="habittracker-icon"
          />

          <text className="sidebar-text">{props.name}</text>
        </div>
      </NavLink>
    </>
  );
}

export default SidebarNavlink;
