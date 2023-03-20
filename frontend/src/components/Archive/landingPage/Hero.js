import HeroImg2 from "../../images/landingPage/main-app2.PNG";

import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className="tw-relative tw-font-Poppins">
        <div className="tw-container tw-mt-14 tw-flex tw-flex-col-reverse tw-items-center tw-gap-12 lg:tw-mt-28 lg:tw-flex-row">
          {/* Content */}
          <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center tw-lg:items-start">
            <h2 className="md:tw-text-4 tw-mb-6 tw-text-center tw-text-3xl tw-font-medium tw-text-bookmark-blue lg:tw-text-left lg:tw-text-5xl">
              Consistency is key
            </h2>

            <p className="tw-mb-6 tw-text-center tw-text-lg tw-text-bookmark-grey lg:tw-text-left">
              A clean and simple way to track any habit and boost productivity.
            </p>
            <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-6">
              <Link to="/login">
                <button className="tw-text-white tw-cursor-pointer tw-font-medium tw-text-base tw-bg-gradient-to-r tw-from-sky-500 tw-via-sky-600 tw-to-sky-700  tw-shadow-md tw-border-none tw-py-3 tw-px-7 tw-rounded-md hover:tw-text-black hover:tw-from-slate-50 hover:tw-via-slate-100 hover:tw-to-slate-200 ">
                  Get Started
                </button>
              </Link>
              <a href="https://www.github.com/lawrencejbho/habit-tracker">
                <button
                  type="button"
                  className="tw-text-black tw-cursor-pointer tw-font-medium tw-text-base tw-bg-gradient-to-r tw-from-slate-50 tw-via-slate-100 tw-to-slate-200  tw-shadow-md tw-border-none tw-py-3 tw-px-7 tw-rounded-md hover:tw-from-sky-500 hover:tw-via-sky-600 hover:tw-to-sky-700 hover:tw-text-white"
                >
                  Github Repo
                </button>
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="tw-z-10 tw-mb-2 tw-flex tw-flex-1 tw-justify-center md:tw-mb-16 lg:tw-mb-0">
            <img
              className="tw-rounded-xl tw-h-[90%] tw-w-[90%] tw-shadow-2xl tw-shadow-sky-900"
              src={HeroImg2}
              alt=""
            />
          </div>
        </div>
        {/* Rounded Rectangle */}
        <div className="tw-absolute tw-top-32 tw-right-0 tw-hidden tw-h-80 tw-w-2/4 tw-overflow-hidden tw-rounded-l-full tw-bg-sky-600 md:tw-block md:tw-top-16 lg:tw-top-10 2xl:tw-top-24"></div>
      </div>
    </>
  );
}
