import React from "react";
import Weather from "../components/Weather.js";
import TodayDate from "../components/TodayDate.js";

function Home() {
  return (
    <>
      <h1 className="white-text">Dashboard</h1>
      <TodayDate />
      <Weather />
    </>
  );
}

export default Home;
