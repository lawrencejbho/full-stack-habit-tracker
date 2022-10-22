import React, { useState, useEffect } from "react";
import ContributionGraph from "../components/ContributionGraph.js";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Analytics() {
  const [habits, setHabits] = useState([]);
  const [currentHabitId, setCurrentHabitId] = useState("");

  const [habitsUpdateArray, setHabitsUpdateArray] = useState([]);

  const [renderState, setRenderState] = useState(false);

  // MUI code for the dropdown menu

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // clicking the menu item will set the habit Id and then render the contribution graph
  const handleClickDisplayGraph = (event) => {
    setCurrentHabitId(event.target.id);
  };

  // setHabits to pull from our database
  useEffect(() => {
    const getHabits = async () => {
      const data = await fetch("/api/habit-get");
      const get_data = await data.json();
      // console.log(get_data);
      setHabits(get_data);
      setRenderState(true);
    };
    getHabits();
  }, [renderState]);

  // add timestamps to Day, same logic as what we are using in HabitTracker.js
  // we'll use the dates in Contribution Graph to be passed upwards to the parent Analytics so that we can help calculate our time offset
  function addTimestamps(date) {
    function calculateOffset() {
      return convertDateToUnixTime(date) + (currentTime() % 86400);
    }

    setHabits((prevHabits) =>
      prevHabits.map((prevHabit) => {
        if (prevHabit.id === currentHabitId) {
          let needsToBeAdded = true;

          // checking if the update exists in our array, if not we'll add it
          for (const exist of habitsUpdateArray) {
            if (exist.id === currentHabitId) {
              needsToBeAdded = false;
            }
          }
          if (needsToBeAdded) {
            // console.log("adding into updates array");
            setHabitsUpdateArray((prevValue) => [...prevValue, prevHabit]);
          }
          // modify the timestamps of the habit in the update array
          setHabitsUpdateArray((prevUpdates) =>
            prevUpdates.map((prevUpdate) => {
              if (prevUpdate.id === currentHabitId) {
                return {
                  ...prevUpdate,
                  timestamps: [...prevHabit.timestamps, calculateOffset()],
                };
              } else {
                return prevUpdate;
              }
            })
          );
          // update the timestamps in the habits array
          return {
            ...prevHabit,
            timestamps: [...prevHabit.timestamps, calculateOffset()], // use spread here instead of push works better for state
          };
        } else {
          return prevHabit;
        }
      })
    );
    // console.log(habitsUpdateArray);
  }

  const convertDateToUnixTime = (dateString) => {
    const date = new Date(dateString);
    return date.getTime() / 1000;
  };

  const currentTime = () => {
    const currentTime = new Date().getTime();
    return Math.floor(currentTime / 1000);
  };

  // timestamps for each habit are updated every 10 seconds but dividing it out into it's own useEffect
  // I am using the habitsUpdate array so that we're not constantly pushing updates onto the database and we'll only make calls for habits that are getting modified
  useEffect(() => {
    async function updateTimestamps() {
      for (const habit of habitsUpdateArray) {
        let data = {
          habit_name: habit.habit_name,
          timestamps: habit.timestamps,
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
        fetch("/api/habit-update-timestamps", requestOptions).then(
          setHabitsUpdateArray(() => {
            return []; // clear out the array when we're done updating
          })
        );
      }
    }

    function checkAfterTenSeconds() {
      updateTimestamps();
    }
    const timer = setInterval(() => checkAfterTenSeconds(), 10000);
    return () => clearInterval(timer);
  }, [habitsUpdateArray]);

  return (
    <div>
      <h1 className="white-text">Analytics</h1>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {habits.map((habit) => {
          return (
            <MenuItem
              onClick={handleClickDisplayGraph}
              onClose={handleClose}
              // onBlur={handleClose}
              id={habit.id}
            >
              {habit.habit_name}
            </MenuItem>
          );
        })}
      </Menu>

      <div className="contribution-graph-container">
        {habits.map((habit) => {
          if (habit.id === currentHabitId) {
            return (
              <ContributionGraph
                timestamps={habit.timestamps}
                id={habit.id}
                add_timestamps={addTimestamps}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default Analytics;
