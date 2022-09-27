import React from "react";
import { Link } from "react-router-dom";

// TODO - probably can make a much nicer navbar in the future or can use something from MUI that maybe pops from the left

function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link className="white-text" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="white-text" to="/productivity/habit">
              Habit Tracker
            </Link>
          </li>
          <li>
            <Link className="white-text" to="/productivity/pomodoro">
              Pomodoro
            </Link>
          </li>
        </ul>
      </nav>
      <hr className="navbar-line"></hr>
    </>
  );
}

export default Navbar;
