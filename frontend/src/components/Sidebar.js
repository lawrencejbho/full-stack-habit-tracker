import React from "react";
import Mango from "../images/mango.png";
import HabitTracker from "../images/habittracker.png";
import Pomodoro from "../images/pomodoro.png";
import Analytics from "../images/analytics.png";
import SettingsIcon from "../images/settings.png";
import Stopwatch from "../images/stopwatch.png";

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
          <SidebarNavlink
            name="Counters"
            image={Stopwatch}
            path="/productivity/counters"
          />
          <SidebarNavlink
            name="Settings"
            image={SettingsIcon}
            path="/productivity/settings"
          />
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
