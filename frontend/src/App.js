import React, { useState } from "react";
// import Cafe from "./images/cafe.jpg";
import Layout from "./components/Layout.js";

// using React for Routing - Pomdoro
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import HabitTracker from "./pages/Productivity/HabitTracker.js";
import Pomodoro from "./pages/Productivity/Pomodoro.js";
import NotFound from "./pages/NotFound.js";
import Analytics from "./pages/Productivity/Analytics.js";
import Counters from "./pages/Productivity/Counters.js";
import UserSettings from "./pages/Productivity/UserSettings.js";
import Home from "./pages/Home.js";
import Home2 from "./pages/Home2.js";
import Login from "./pages/Login.js";
import License from "./pages/License.js";
import Dashboard from "./pages/Dashboard.js";

function App() {
  const [userId, setUserId] = useState("");

  // userId will be passed from habitTracker, child to parent so that we can maintain it for the rest of the app
  const sharedUserId = (id) => {
    setUserId(id);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/home" title="Home / Habby" />}
          />
          <Route path="/home" element={<Home2 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/license" element={<License />} />

          <Route
            path="/productivity"
            element={
              <>
                <Layout />
                <div className="middle-body">
                  <Outlet />
                  {/* this isn't well documented but you need to useOutlet to specify where the child element will be rendered or you'll only get the parent element*/}
                </div>
              </>
            }
          >
            <Route
              exact
              path="habit"
              element={
                <HabitTracker
                  title="Habits / Habby"
                  sharedUserId={sharedUserId}
                />
              }
            />
            <Route
              exact
              path="pomodoro"
              element={<Pomodoro title="Pomodoro / Habby" userId={userId} />}
            />
            <Route
              exact
              path="analytics"
              element={<Analytics title="Analytics / Habby" userId={userId} />}
            />
            <Route
              exact
              path="settings"
              element={
                <UserSettings title="Settings / Habby" userId={userId} />
              }
            />
            <Route
              exact
              path="counters"
              element={<Counters title="Counters / Habby" userId={userId} />}
            />
          </Route>
          <Route path="*" element={<Home2 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
