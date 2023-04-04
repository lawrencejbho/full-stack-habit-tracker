import React from "react";

import Hero from "../images/hero.png";
import HeroSmall from "../images/hero-small.png";
import Logo from "../images/logo.svg";
import LogoHeading from "../images/logo-heading.png";

import AboutModal from "../components/AboutModal";

export default function Home() {
  return (
    <div className="tw-bg-[#f4ede3] tw-h-screen tw-overflow-x-hidden tw-overflow-y-hidden ">
      <div className=" tw-container tw-mt-4 tw-flex tw-items-center sm:tw-mt-8 ">
        <div className="tw-pt-2 tw-z-40">
          <img src={Logo} className="tw-w-20" />
        </div>
      </div>

      <div className="tw-w-full tw-h-[75%]">
        <div className=" tw-flex tw-flex-col tw-absolute tw-border-4 tw-justify-center  tw-items-center tw-overflow-x-hidden tw-overflow-y-hidden tw-visible sm:tw-invisible sm:tw-hidden tw-w-full">
          <img
            className="tw-w-[90%] h1:tw-max-w-[300px] tw-visibile tw-top-20 sm:tw-invisible"
            src={LogoHeading}
            alt="heading"
          />
          <img
            className="tw-w-[70%] tw-h-[75%] h1:tw-max-w-[300px] tw-visible sm:tw-invisible"
            src={HeroSmall}
            alt="heading"
          />
        </div>

        <div className="tw-top-4 h2:tw-top-0 tw-flex sm:tw-z-10 tw-invisible sm:tw-visible tw-absolute tw-border-4 tw-justify-center tw-items-center tw-w-full tw-overflow-x-hidden tw-overflow-y-hidden tw-bg-[#f4ede3]">
          <img
            className="tw-w-full h1:tw-max-w-[700px] h2:tw-w-[800px] h3:tw-max-w-[1000px] tw-invisible sm:tw-visible tw-items-center tw-justify-center tw-flex "
            src={Hero}
            alt="hero"
          />
        </div>
      </div>

      <div className="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-30">
        <a
          className="tw-absolute tw-bottom-16 h2:tw-bottom-28 tw-z-20"
          href="/login"
        >
          <button className="tw-text-base h2:tw-text-xl tw-cursor-pointer tw-font-semibold tw-bottom-28 tw-border-transparent tw-rounded-full tw-w-36 tw-h-10 h2:tw-w-48 h2:tw-h-16 tw-font-Poppins hover:tw-drop-shadow-lg  tw-text-[#e69653] tw-bg-white ">
            Sign In
          </button>
        </a>
        {/* <span className="tw-absolute tw-underline tw-bottom-16 tw-font-Popppins tw-font-bold tw-z-20">
          What is this?
        </span> */}
        <div className="tw-absolute tw-bottom-3 tw-z-40">
          <AboutModal className="" />
        </div>
      </div>
    </div>
  );
}
