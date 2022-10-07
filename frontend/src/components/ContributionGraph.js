import React, { useEffect, useState } from "react";
import Box from "./Box.js";
// import FakeData from "./FakeData.js";
import FakeChronologicalData from "./FakeChronologicalData.js";

function ContributionGraph(props) {
  const [pomodoroData, setPomodoroData] = useState([{}]);
  const [isPropsReady, setIsPropsReady] = useState(false);

  useEffect(() => {
    setPomodoroData(FakeChronologicalData);
  }, []);

  useEffect(() => {
    if (props.pomodoros != null) {
      if (props.pomodoros.length != 0) {
        determineDateByPomodoro();
        setIsPropsReady(true); // need to use state here so that we can force a rerender or else the graph won't show anything initially
      }
    }
  }, [props.pomodoros]);

  // go through each pomodoro in the array and convert it into the date, find the index that corresponds to that date and then increment it's count
  function determineDateByPomodoro() {
    props.pomodoros.forEach((value) => {
      const date = new Date(value * 1000).toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // console.log(date);
      const searchObjectIndex = pomodoroData.findIndex(
        (day) => day.date == date
      );
      console.log(searchObjectIndex);
      pomodoroData[searchObjectIndex].count++;
      console.log(pomodoroData[searchObjectIndex].count);
    });
  }

  return (
    <div className="outer-box-box-container">
      <div className="box-container">
        {pomodoroData.map((entry, index) => (
          <Box key={index} date={entry.date} contributions={entry.count} />
        ))}
      </div>
    </div>
  );
}

export default ContributionGraph;
