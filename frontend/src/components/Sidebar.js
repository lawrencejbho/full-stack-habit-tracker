import React from "react";
import Habby from "../images/habby.svg";
import Logo from "../images/logo.svg";
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
        <div className=" tw-font-Poppins tw-flex tw-items-center tw-justify-center">
          <img className="tw-top-0 tw-w-20" src={Logo} alt="habby-icon" />
        </div>

        <div className="sidebar-list ">
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
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
