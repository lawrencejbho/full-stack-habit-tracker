import React from "react";

function TodayDate() {
  // code to get the date, use an array of months, and display the date as a string

  let date = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const todayDateString = `${
    month[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;

  return (
    <div>
      <h4 className="tw-text-lg"> {todayDateString}</h4>
    </div>
  );
}

export default TodayDate;
