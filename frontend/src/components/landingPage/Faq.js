import Dropdown from "./Dropdown.js";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function Faq() {
  const [dropdownData, setDropdownData] = useState([
    {
      id: "1",
      question: "How do i setup my tasks?",
      answer:
        "From the Habit Tracker tab, give a name to your habit and then click the + sign.  This will automatically create your habit that can be used in all parts of the app.",
      selected: false,
    },
    {
      id: "2",
      question: "Do I need to sign in to use the HaTr?",
      answer:
        "After clicking Get Started or Login, you can click on Access Test Environment Without Logging In.  This will give you access to the creator's environment and allow you full access to all features.",
      selected: false,
    },
    {
      id: "3",
      question:
        "How can I make contributions on the graph by clicking on the boxes?",
      answer:
        "Making contributions by directly clicking on each box can only be done in the Analytics tab and cannot be done from the Pomodoro section.",
      selected: false,
    },
    {
      id: "4",
      question: "How do i request a new feature?",
      answer: "All feature requests can be sent to support@hatr.com",
      selected: false,
    },
  ]);

  // need to verify that I'm not messing up the rest of the array with the modifications
  function handleClick(id) {
    setDropdownData((data) =>
      data.map((item) => {
        if (item.id === id) {
          return { ...item, selected: !item.selected };
        }
        return item;
      })
    );
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
            {dropdownData.map((item) => {
              return (
                <Dropdown
                  handleClick={handleClick}
                  question={item.question}
                  answer={item.answer}
                  selected={item.selected}
                  id={item.id}
                />
              );
            })}
            <Link to="/login" className="tw-self-center">
              <button className="tw-text-white tw-mt-8 tw-font-medium tw-text-base tw-self-center tw-bg-gradient-to-r tw-from-sky-500 tw-via-sky-600 tw-to-sky-700  tw-shadow-md tw-border-none tw-py-3 tw-px-7 tw-rounded-md hover:tw-text-black hover:tw-from-slate-50 hover:tw-via-slate-100 hover:tw-to-slate-200 ">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
