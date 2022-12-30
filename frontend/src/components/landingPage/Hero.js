import HeroImg from "../../images/landingPage/hero-bg.png";

import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className="tw-relative tw-font-Poppins">
        <div className="tw-container tw-mt-14 tw-flex tw-flex-col-reverse tw-items-center tw-gap-12 lg:tw-mt-28 lg:tw-flex-row">
          {/* Content */}
          <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center tw-lg:items-start">
            <h2 className="md:tw-text-4 tw-mb-6 tw-text-center tw-text-3xl tw-font-medium tw-text-bookmark-blue lg:tw-text-left lg:tw-text-5xl">
              Achieve your goals
            </h2>

            <p className="tw-mb-6 tw-text-center tw-text-lg tw-text-bookmark-grey lg:tw-text-left">
              A clean and simple way to track any habit and boost productivity.
            </p>
            <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-6">
              <Link to="/login">
                <button className="tw-text-white tw-font-medium tw-text-base tw-bg-gradient-to-r tw-from-purple-500 tw-via-purple-600 tw-to-purple-700  tw-shadow-md tw-border-none tw-py-3 tw-px-7 tw-rounded-md hover:tw-bg-gradient-to-br">
                  Get Started
                </button>
              </Link>
              <a href="https://www.github.com/lawrencejbho/habit-tracker">
                <button
                  type="button"
                  className="tw-text-white tw-font-medium tw-text-base tw-bg-gradient-to-r tw-from-purple-500 tw-via-purple-600 tw-to-purple-700  tw-shadow-md tw-border-none tw-py-3 tw-px-7 tw-rounded-md hover:tw-bg-gradient-to-br"
                >
                  Github Repo
                </button>
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="tw-z-10 tw-mb-2 tw-flex tw-flex-1 tw-justify-center md:tw-mb-16 lg:tw-mb-0">
            <img
              className="tw-h-5/6 tw-w-5/6 sm:tw-h-3/4 sm:tw-w-3/4 md:tw-h-full md:tw-w-full"
              src={HeroImg}
              alt=""
            />
          </div>
        </div>
        {/* Rounded Rectangle */}
        <div className="tw-absolute tw-top-32 tw-right-0 tw-hidden tw-h-80 tw-w-2/4 tw-overflow-hidden tw-rounded-l-full tw-bg-bookmark-purple md:tw-block lg:tw--bottom-28 "></div>
      </div>
    </>
  );
}
