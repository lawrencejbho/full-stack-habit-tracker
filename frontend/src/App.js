import React from "react";
import Cafe from "./images/cafe.jpg";
import Navbar from "./pages/Navbar.js";

// using React for Routing - Pomdoro
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HabitTracker from "./pages/HabitTracker.js";
import Timer from "./pages/Timer.js";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";

function App() {
  // not sure if this is the best way to apply the background image by doing it directly through style
  const backgroundStyle = {
    backgroundImage: `url(${Cafe})`,
    backgroundSize: "auto 700px",
    backgroundRepeat: "no-repeat",
  };

  return (
    <Router>
      <div style={backgroundStyle}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productivity">
            <Route path="timer" element={<Timer />} />
            <Route path="habit" element={<HabitTracker />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
