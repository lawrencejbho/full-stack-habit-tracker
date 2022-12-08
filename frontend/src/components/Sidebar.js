import React from "react";
import Mango from "../images/mango.png";
import HabitTracker from "../images/habittracker.png";
import Pomodoro from "../images/pomodoro.png";
import Analytics from "../images/analytics.png";
import SidebarNavlink from "./SidebarNavlink.js";

function Sidebar() {
  return (
    <>
      <nav>
        <div className="sidebar-title">
          <img className="sidebar-mango-icon" src={Mango} alt="mango-icon" />
          <div>HaTr</div>
        </div>

        <ul className="sidebar-list">
          <SidebarNavlink
            name="Habit Tracker"
            image={HabitTracker}
            path="/productivity/habit"
          />

          <SidebarNavlink
            name="Pomodoro"
            image={Pomodoro}
            path="/productivity/pomodoro"
          />

          <SidebarNavlink
            name="Analytics"
            image={Analytics}
            path="/productivity/analytics"
          />
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
