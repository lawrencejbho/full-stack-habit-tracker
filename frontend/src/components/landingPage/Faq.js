import Dropdown from "./Dropdown.js";
import React, { useState } from "react";

export default function Faq() {
  const [display, setDisplay] = useState(false);

  function handleClick() {
    setDisplay((prevValue) => !prevValue);
  }

  return (
    <>
      <div className="tw-bg-bookmark-white tw-py-20 tw-font-Poppins" id="faq">
        <div className="tw-container">
          <div className="tw-mx-auto tw-px-2 sm:tw-w-3/4 lg:tw-w-5/12">
            <h1 className="tw-text-center tw-text-3xl tw-text-bookmark-blue tw-font-normal">
              Frequently Asked Questions
            </h1>
            <p className="tw-mt-4 tw-text-center tw-text-bookmark-grey">
              Here are some of our FAQs.
            </p>
          </div>
          {/* FAQ Items */}
          {/* trying to figure out how to get the border  */}
          <div className="tw-mx-auto tw-mt-12 tw-flex tw-flex-col sm:tw-w-3/4 lg:tw-w-5/12">
            <div className="tw-flex tw-items-center tw-py-4 tw-border-slate-200 tw-border-b tw-border-t-0 tw-border-solid tw-border-x-0">
              <div className="tw-flex-1">What is a Bookmark</div>
              <i className="fas fa-chevron-down tw-text-bookmark-purple"></i>
            </div>

            <div className="tw-flex tw-items-center tw-py-4 tw-border-slate-200 tw-border-b tw-border-t-0 tw-border-solid tw-border-x-0">
              <span className="tw-flex-1">What is a Bookmark</span>
              <i className="fas fa-chevron-down tw-text-bookmark-purple"></i>
            </div>
            <div className="tw-flex tw-items-center tw-py-4 tw-border-slate-200 tw-border-b tw-border-t-0 tw-border-solid tw-border-x-0">
              <span className="tw-flex-1">What is a Bookmark</span>
              <i className="fas fa-chevron-down tw-text-bookmark-purple"></i>
            </div>
            <div className="tw-flex tw-items-center tw-py-4 tw-border-slate-200 tw-border-b tw-border-t-0 tw-border-solid tw-border-x-0">
              <span className="tw-flex-1">What is a Bookmark</span>
              <i
                className="fas fa-chevron-down tw-text-bookmark-purple"
                onClick={handleClick}
              >
                {display && <Dropdown text="sample text" />}
              </i>
            </div>

            <button className="tw-text-white tw-mt-8 tw-font-medium tw-text-base tw-self-center tw-bg-gradient-to-r tw-from-indigo-500 tw-via-indigo-600 tw-to-indigo-700  tw-shadow-md tw-border-none tw-py-3 tw-px-7 tw-rounded-md hover:tw-text-black hover:tw-from-slate-50 hover:tw-via-slate-100 hover:tw-to-slate-200 ">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
