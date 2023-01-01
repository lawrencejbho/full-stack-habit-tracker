import Dropdown from "./Dropdown.js";
import React, { useState } from "react";

export default function Faq() {
  const [dropdownData, setDropdownData] = useState([
    {
      id: "1",
      question: "sample-text",
      answer: "sample-text",
      selected: false,
    },
    {
      id: "2",
      question: "sample-text",
      answer: "sample-text",
      selected: false,
    },
    {
      id: "3",
      question: "sample-text",
      answer: "sample-text",
      selected: false,
    },
    {
      id: "4",
      question: "sample-text",
      answer: "sample-text",
      selected: false,
    },
  ]);

  // need to verify that I'm not messing up the rest of the array with the modifications
  function handleClick(id) {
    setDropdownData((data) => {
      data.map((item) => {
        if (id === item.id) {
          console.log("hit");
          return { ...item, question: "test" };
        } else {
          console.log("miss");
          return item;
        }
      });
    });
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
          <div className="tw-mx-auto tw-mt-12 tw-flex tw-flex-col sm:tw-w-3/4 lg:tw-w-5/12">
            {dropdownData.map((item) => (
              <Dropdown
                handleClick={handleClick}
                question={item.question}
                answer={item.answer}
                selected={item.selected}
                id={item.id}
                key={item.id}
              />
            ))}

            <button className="tw-text-white tw-mt-8 tw-font-medium tw-text-base tw-self-center tw-bg-gradient-to-r tw-from-indigo-500 tw-via-indigo-600 tw-to-indigo-700  tw-shadow-md tw-border-none tw-py-3 tw-px-7 tw-rounded-md hover:tw-text-black hover:tw-from-slate-50 hover:tw-via-slate-100 hover:tw-to-slate-200 ">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
