import React from "react";
import Weather from "../components/Weather.js";

// this page may include something like a weather app and it'll tell you to wear sunscreen

// for weather it might just make sense to scrape instead for the sunscreen thing

function Home() {
  return (
    <>
      <h1 className="white-text"> This is Home</h1>
      <Weather />
    </>
  );
}

export default Home;
