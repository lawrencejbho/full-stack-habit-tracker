import React from "react";

import Header from "../components/landingPage/Header.js";
import Hero from "../components/landingPage/Hero.js";
import Features from "../components/landingPage/Features.js";
import Faq from "../components/landingPage/Faq.js";
import Footer from "../components/landingPage/Footer.js";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Faq />
      <Footer />
    </>
  );
}

export default Home;
