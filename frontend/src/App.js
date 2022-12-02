import React from "react";
// import Cafe from "./images/cafe.jpg";
import Sidebar from "./components/Sidebar.js";
import Header from "./components/Header.js";

// using React for Routing - Pomdoro
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HabitTracker from "./pages/HabitTracker/HabitTracker.js";
import Pomodoro from "./pages/Pomodoro/Pomodoro.js";
import Dashboard from "./pages/Home/Dashboard.js";
import NotFound from "./pages/NotFound.js";
import Analytics from "./pages/Analytics/Analytics.js";
import Counters from "./pages/Counters/Counters.js";

function App() {
  // not sure if this is the best way to apply the background image by doing it directly through style
  // const backgroundStyleImage = {
  //   backgroundImage: `url(${Cafe})`,
  //   backgroundSize: "auto 700px",
  //   backgroundRepeat: "no-repeat",
  //   minHeight: "150vh", // this makes it so that the background always shows or else it gets truncated by different Route paths where the height is smaller
  // };
  const backgroundStyleColor = {
    backgroundColor: "#5D5C61",
  };

  return (
    <>
      <Header />
      <Router>
        <Sidebar />
        <div className="middle-body" style={backgroundStyleColor}>
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
      </Router>
    </>
  );
}

export default App;
