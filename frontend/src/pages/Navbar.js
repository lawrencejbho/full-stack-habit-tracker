import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/productivity/habit">Habit Tracker</Link>
          </li>
          <li>
            <Link to="/productivity/timer">Timer</Link>
          </li>
        </ul>
      </nav>
      <hr className="navbar-line"></hr>
    </>
  );
}

export default Navbar;
