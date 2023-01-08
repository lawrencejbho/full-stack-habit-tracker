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
        <div className="sidebar-title tw-font-Poppins tw-font-semibold tw-contents-center">
          <img className="tw-w-10" src={Mango} alt="mango-icon" />
          <div className="tw-px-1 tw-mt-1">HaTr</div>
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
