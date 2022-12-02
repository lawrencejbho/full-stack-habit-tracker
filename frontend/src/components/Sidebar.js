import React from "react";
import { Link } from "react-router-dom";
import Mango from "../images/mango.png";
import HabitTracker from "../images/habittracker.png";
import Pomodoro from "../images/pomodoro.png";
import Analytics from "../images/analytics.png";

function Sidebar() {
  return (
    <>
      <nav>
        <div className="sidebar-title">
          <img className="sidebar-mango-icon" src={Mango} alt="mango-icon" />
          <div>HaTr</div>
        </div>
        <ul className="sidebar-list">
          {/* <Link className="white-text" to="/">
              Home
            </Link> */}

          <img
            className="sidebar-habittracker-icon"
            src={HabitTracker}
            alt="habittracker-icon"
          />

          <Link className="sidebar-text" to="/productivity/habit">
            Habit Tracker
          </Link>

          <img
            className="sidebar-pomodoro-icon"
            src={Pomodoro}
            alt="pomodoro-icon"
          />

          <Link className="sidebar-text" to="/productivity/pomodoro">
            Pomodoro
          </Link>

          <img
            className="sidebar-analytics-icon"
            src={Analytics}
            alt="analytics-icon"
          />
          <Link className="sidebar-text" to="/productivity/analytics">
            Analytics
          </Link>

          {/* 
            <Link className="white-text" to="/productivity/counters">
              Counters
            </Link>
            */}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
