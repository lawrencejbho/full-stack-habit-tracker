import React, { useEffect, useState, useMemo } from "react";
import Box from "./Box.js";

function ContributionGraph(props) {
  const [pomodoroData, setPomodoroData] = useState([{}]);
  const [isPropsReady, setIsPropsReady] = useState(false);
  const [timeOffset, setTimeOffset] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // pull the calendar from database
  useEffect(() => {
    fetch("/api/calendar-get")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setPomodoroData(res);
      });
  }, []);

  useEffect(() => {
    if (props.pomodoros !== null) {
      if (props.pomodoros.length !== 0) {
        determineDateByPomodoro();
        setIsPropsReady((prevValue) => !prevValue); // need to use state here so that we can force a rerender or else the graph won't show anything initially
      }
    }
  }, [props.pomodoros, pomodoroData]);

  // go through each pomodoro in the array and convert it into the date, find the index that corresponds to that date and then increment it's count
  function determineDateByPomodoro() {
    props.pomodoros.forEach((value) => {
      const date = new Date(value * 1000).toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      // console.log(date);

      // need this because of the async, or it'll sometimes break the app if pomodoroData isn't ready
      if (pomodoroData.length > 1) {
        const searchObjectIndex = pomodoroData.findIndex(
          (day) => day.date == date
        );
        // console.log(pomodoroData[searchObjectIndex]);
        pomodoroData[searchObjectIndex].count++;
      }
    });
  }

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

  return (
    <div className="contribution-graph-box-container">
      <div className="box2-container">
        {pomodoroData.length > 1 &&
          pomodoroData.map((entry, index) => {
            const date = convertDateToUnixTime(entry.date);
            if (
              currentTime - date > 31536000 + timeOffset ||
              date > currentTime
            ) {
              return;
            }
            return (
              <Box key={index} date={entry.date} contributions={entry.count} />
            );
          })}
      </div>
    </div>
  );
}

export default ContributionGraph;
