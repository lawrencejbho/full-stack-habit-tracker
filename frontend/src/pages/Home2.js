import React from "react";

import Hero from "../images/hero.png";
import HeroSmall from "../images/hero-small.png";
import Logo from "../images/logo.svg";
import LogoHeading from "../images/logo-heading.png";

export default function Home2() {
  return (
    <div className="tw-bg-[#f4ede3] tw-overflow-x-hidden tw-overflow-y-hidden">
      <img
        className="tw-z-20 tw-absolute tw-m-6 tw-mt-12 tw-w-20 tw-invisible sm:tw-visible "
        src={Logo}
        alt=""
      />
      <div className="tw-absolute tw-flex tw-border-4 tw-justify-center tw-items-center tw-overflow-x-hidden tw-overflow-y-hidden ">
        <img
          className="tw-w-full tw-visibile tw-absolute tw-top-20 sm:tw-invisible"
          src={LogoHeading}
          alt="heading"
        />
        <img
          className="tw-w-[75%] tw-h-[75%] tw-mt-56 tw-visibile sm:tw-invisible"
          src={HeroSmall}
          alt="heading"
        />
      </div>

      <div className=" tw-flex tw-border-4 tw-justify-center tw-items-center tw-w-screen tw-h-screen tw-overflow-x-hidden tw-overflow-y-hidden tw-bg-[#f4ede3]">
        <img
          className="tw-w-full lg:tw-w-[75%] xl:tw-w-[50%] tw-invisible sm:tw-visible"
          src={Hero}
          alt="hero"
        />
        <a className="tw-text-inherit" href="/login">
          <button className="tw-absolute tw-text-xl tw-font-semibold tw-bottom-28 tw-border-transparent tw-rounded-full tw-w-48 tw-h-16 tw-font-Poppins hover:tw-drop-shadow-lg  tw-text-[#e69653] tw-bg-white">
            Sign In
          </button>
        </a>

        <span className="tw-absolute tw-underline tw-bottom-16 tw-font-Popppins tw-font-bold">
          What is this?
        </span>
      </div>
    </div>
  );
}
