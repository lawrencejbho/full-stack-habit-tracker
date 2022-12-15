import React from "react";
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
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";

function App() {
  // not sure if this is the best way to apply the background image by doing it directly through style
  // const backgroundStyleImage = {
  //   backgroundImage: `url(${Cafe})`,
  //   backgroundSize: "auto 700px",

  //   backgroundRepeat: "no-repeat",
  //   minHeight: "150vh", // this makes it so that the background always shows or else it gets truncated by different Route paths where the height is smaller
  // };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

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
            <Route exact path="pomodoro" element={<Pomodoro />} />
            <Route exact path="habit" element={<HabitTracker />} />
            <Route exact path="analytics" element={<Analytics />} />
            <Route exact path="counters" element={<Counters />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
