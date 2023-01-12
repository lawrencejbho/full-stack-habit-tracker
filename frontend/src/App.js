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
            element={<Navigate to="/home" title="Home / HaTr" />}
          />
          <Route path="/home" element={<Home />} />
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
                  title="Habits / HaTr"
                  sharedUserId={sharedUserId}
                />
              }
            />
            <Route
              exact
              path="pomodoro"
              element={<Pomodoro title="Pomodoro / HaTr" userId={userId} />}
            />
            <Route
              exact
              path="analytics"
              element={<Analytics title="Analytics / HaTr" userId={userId} />}
            />
            <Route
              exact
              path="settings"
              element={<UserSettings title="Settings / HaTr" userId={userId} />}
            />
            <Route
              exact
              path="counters"
              element={<Counters title="Counters / HaTr" userId={userId} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
