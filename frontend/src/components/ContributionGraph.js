import React, { useEffect, useState, useMemo } from "react";
import Box from "./Box.js";

function ContributionGraph(props) {
  const [habitData, setHabitData] = useState([]);
  const [isPropsReady, setIsPropsReady] = useState(false);
  const [timeOffset, setTimeOffset] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  let currentMonth = "";
  let count = 0;

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

  // pull the calendar from database
  useEffect(() => {
    fetch("/api/calendar-get")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setHabitData(res);
      });
  }, []);

  useEffect(() => {
    // go through each habit in the array and convert it into the date, find the index that corresponds to that date and then increment it's count
    function determineDateByHabit() {
      // use this to zero out all of our counters or else it'll start double counting every time we click on a box
      habitData.forEach((value) => (value.count = 0));

      props.timestamps.forEach((value) => {
        const date = new Date(value * 1000).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        // console.log(date);

        // need this because of the async, or it'll sometimes break the app if habitData isn't ready
        if (habitData.length > 1) {
          const searchObjectIndex = habitData.findIndex(
            (day) => day.date === date
          );
          // console.log(habitData[searchObjectIndex]);
          habitData[searchObjectIndex].count++;
        }
      });
    }

    // use this because sometimes the async is slow so wait until this gets properly updated
    if (props.timestamps !== undefined) {
      if (props.timestamps.length !== 0) {
        determineDateByHabit();
        setIsPropsReady((prevValue) => !prevValue); // need to use state here so that we can force a rerender or else the graph won't show anything initially
      }
    }
  }, [props.timestamps, habitData]);

  // convert our dates in string format back into unix time
  const convertDateToUnixTime = (dateString) => {
    const date = new Date(dateString);
    return date.getTime() / 1000;
  };

  // grab the current time, with useMemo it should only calculate this on the first page load
  useMemo(() => {
    setCurrentTime(Math.floor(new Date().getTime() / 1000));
  }, []);

  // I'm not sure if these calculations here are expensive because they are run per each entry in the database, also they get run every rerender.
  // not sure if this is what useMemo is for but will leave like this for now
  // this will grab the current day and then create a time offset for our calculation later that will make it so that the graph always starts on Sunday
  useMemo(() => {
    const currentDayInteger = new Date().getDay();
    for (let i = 0; i < currentDayInteger; i++) {
      setTimeOffset((offset) => (offset += 86400));
    }
  }, []);

  const convertDateToMonth = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth();
  };

  /*
  couldn't find a good way to make the months display all in the same map of the habitData so I just divided it out by two 
  also had some problems with getting it to render the month, then 7 boxes so I just created them as two separate components
  from there it's mostly just using css and html to get the proper lineup.  It looks pretty good but the spacing is not uniform to the boxes unfortunately
  */
  return (
    <div className="contribution-graph-box-container">
      <div className="contribution-graph-days">
        <div>Mon</div>
        <div>Wed</div>
        <div>Fri</div>
      </div>

      <div className="contribution-graph-parent">
        <div className="contribution-graph-months">
          {habitData.length > 1 &&
            habitData.map((entry, index) => {
              const date = convertDateToUnixTime(entry.date);
              if (
                currentTime - date > 31536000 + timeOffset ||
                date > currentTime
              ) {
                return false;
              }
              let newMonth = convertDateToMonth(entry.date);
              count++;
              if (count % 7 === 1) {
                if (currentMonth !== newMonth) {
                  currentMonth = newMonth;
                  return <div>{month[newMonth].slice(0, 3)}</div>;
                } else {
                  return <div>&emsp;</div>;
                }
              }
            })}
        </div>

        <div className="box2-container">
          {habitData.length > 1 &&
            habitData.map((entry, index) => {
              const date = convertDateToUnixTime(entry.date);
              if (
                currentTime - date > 31536000 + timeOffset ||
                date > currentTime
              ) {
                return false;
              }
              return (
                <div>
                  <Box
                    key={index}
                    date={entry.date}
                    contributions={entry.count}
                    add_timestamps={props.add_timestamps}
                    handleClick={() => props.add_timestamps(entry.date)}
                    randomColor={props.randomColor}
                  />
                </div>
              );
            })}
        </div>

        <div className="contribution-graph-legend">
          Less
          <Box contributions={0} randomColor={props.randomColor} />
          <Box contributions={1} randomColor={props.randomColor} />
          <Box contributions={3} randomColor={props.randomColor} />
          <Box contributions={5} randomColor={props.randomColor} />
          <Box contributions={7} randomColor={props.randomColor} />
          More
        </div>
      </div>
    </div>
  );
}

export default ContributionGraph;
