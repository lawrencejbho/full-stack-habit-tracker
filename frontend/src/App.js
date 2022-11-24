import React from "react";
import Cafe from "./images/cafe.jpg";
import Navbar from "./pages/Navbar.js";

// using React for Routing - Pomdoro
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HabitTracker from "./pages/HabitTracker.js";
import Pomodoro from "./pages/Pomodoro.js";
import Dashboard from "./pages/Dashboard.js";
import NotFound from "./pages/NotFound.js";
import Analytics from "./pages/Analytics.js";
import Counters from "./pages/Counters.js";
import { width } from "@mui/system";

function App() {
  // not sure if this is the best way to apply the background image by doing it directly through style
  const backgroundStyle = {
    backgroundImage: `url(${Cafe})`,
    backgroundSize: "auto 700px",
    // backgrounSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "150vh",
  };

  // const backgroundContainer = {
  //   height: "1000px",
  //   width: "1000px",
  //   backgroundSize: "1000px 1000px",
  // };

  return (
    <Router>
      {/* <div style={backgroundContainer}> */}
      <div style={backgroundStyle}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/productivity/habit" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productivity">
            <Route path="pomodoro" element={<Pomodoro />} />
            <Route path="habit" element={<HabitTracker />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="counters" element={<Counters />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* </div> */}
    </Router>
  );
}

export default App;
