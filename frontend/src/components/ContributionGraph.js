import React, { useEffect, useState } from "react";
import Box from "./Box.js";
// import FakeData from "./FakeData.js";
import FakeChronologicalData from "./FakeChronologicalData.js";

function ContributionGraph() {
  const [pomodoroDatabase, setPomodoroDatabase] = useState([]);
  const [pomodoroData, setPomodoroData] = useState([{}]);

  // return (
  //   <div className="outer-box-box-container">
  //     <div className="box-container">
  //       {FakeData.map((entry, index) => (
  //         <Box
  //           key={index}
  //           contributions={entry.contributions}
  //           date={entry.date}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );

  // get pomodoros

  useEffect(() => {
    setPomodoroData(FakeChronologicalData);
  }, []);

  useEffect(() => {
    async function getPomodoros() {
      fetch("/api/pomodoro-get")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data[0].pomodoros);
          setPomodoroDatabase(data[0].pomodoros);
          console.log(pomodoroDatabase);
        })
        .then(determineDateByPomodoro());
    }
    getPomodoros();
  }, []);

  // go through each pomodoro in the array and convert it into the date, find the index that corresponds to that date and then increment it's count
  function determineDateByPomodoro() {
    console.log("test" + pomodoroDatabase);
    if (pomodoroDatabase.length) {
      console.log("hit");
      pomodoroDatabase.forEach((value) => {
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
