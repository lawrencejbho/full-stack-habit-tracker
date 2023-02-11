import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import ContributionGraph from "../../components/ContributionGraph.js";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import LoadingSpinner from "../../components/LoadingSpinner.js";
import LoadingError from "../../components/LoadingError.js";

function Analytics(props) {
  const [habits, setHabits] = useState([]);
  const [currentHabitId, setCurrentHabitId] = useState("");
  const [currentStyle, setCurrentStyle] = useState("Random");
  const [currentHabitName, setCurrentHabitName] = useState("");

  const [habitsUpdateArray, setHabitsUpdateArray] = useState([]);

  const [randomColor, setRandomColor] = useState("");

  const queryClient = useQueryClient();

  // MUI code for the dropdown menu

  const [anchorElDashboard, setAnchorElDashboard] = useState(null);
  const [anchorElStyles, setAnchorElStyles] = useState(null);

  const openDashboard = Boolean(anchorElDashboard);
  const openStyles = Boolean(anchorElStyles);

  // type annotation here, but it's not typescript, should try removing it

  function handleClickDashboard(event) {
    setAnchorElDashboard(event.currentTarget);
  }
  function handleClickStyles(event) {
    setAnchorElStyles(event.currentTarget);
  }
  function handleCloseDashboard() {
    setAnchorElDashboard(null);
  }

  function handleCloseStyles() {
    setAnchorElStyles(null);
  }

  // clicking the menu item will set the habit Id and then render the contribution graph
  function handleClickDisplayGraph(event) {
    setCurrentHabitId(event.target.id);
    setCurrentHabitName(event.target.getAttribute("name"));
  }

  function handleClickGraphStyle(event) {
    setCurrentStyle(event.target.id);
  }

  // contribution graph styles

  const colorStyles = ["Random", "Default", "Halloween", "Christmas"];

  // add timestamps to Day, same logic as what we are using in HabitTracker
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

  function convertDateToUnixTime(dateString) {
    const date = new Date(dateString);
    return date.getTime() / 1000;
  }

  function currentTime() {
    const currentTime = new Date().getTime();
    return Math.floor(currentTime / 1000);
  }

  // React Queries

  const getHabitsQuery = useQuery({
    queryKey: ["habits2"],
    queryFn: getHabits,
    refetchOnWindowFocus: false,
  });

  function getHabits() {
    return axios
      .post("/api/habit-get", {
        user_id: props.userId,
      })
      .then(function (response) {
        setHabits(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // added timestamps for each habit are updated every 10 seconds
  // I am using the habitsUpdate array so that we're not constantly pushing updates onto the database and we'll only make calls for habits that are getting modified

  const updateHabitTimestampsQuery = useMutation({
    mutationFn: (update_habit) => updateHabitTimestamps(update_habit),
    // onSuccess: () => queryClient.invalidateQueries(["habits"]), This isn't needed as the onSuccess in mutate() will bunch the queries together.
  });

  function updateHabitTimestamps(update_habit) {
    return axios
      .post("/api/habit-update-timestamps", {
        habit_name: update_habit.habit_name,
        user_id: props.userId,
        timestamps: update_habit.timestamps,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    function updateMultiple() {
      for (const habit of habitsUpdateArray) {
        updateHabitTimestampsQuery.mutate(habit, {
          onSuccess: () =>
            queryClient.invalidateQueries(["habits2"]).then(
              // queryClient is pretty smart so this single promise will only happen after the very last mutation is finished
              setHabitsUpdateArray(() => {
                return []; // make sure we clear out the array when we're done updating
              })
            ),
        });
      }
    }
    function checkAfterTenSeconds() {
      updateMultiple();
    }

    const timer = setInterval(() => checkAfterTenSeconds(), 3000);
    return () => clearInterval(timer);
  }, [habitsUpdateArray]);

  useEffect(() => {
    setRandomColor(Math.floor(Math.random() * 0xffffff).toString(16));
  }, []);

  useEffect(() => {
    document.title = props.title;
  }, []);

  if (getHabitsQuery.isLoading || getHabitsQuery.status == "loading") {
    return (
      <div className="tw-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (getHabitsQuery.isError) {
    // console.log("error");
    return (
      <div className="tw-h-screen">
        <LoadingError />
      </div>
    );
  }

  return (
    <div className="main-body">
      <h1 className="white-text">Analytics</h1>
      <hr className="app-line"></hr>

      <Button
        id="basic-button"
        aria-controls={openDashboard ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openDashboard ? "true" : undefined}
        onClick={handleClickDashboard}
        sx={{
          backgroundColor: "white",
          opacity: 0.8,
          borderRadius: 1,
        }}
      >
        Choose Habit
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElDashboard}
        open={openDashboard}
        onClose={handleCloseDashboard}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {habits.map((habit) => {
          return (
            <MenuItem
              onClick={handleClickDisplayGraph}
              onClose={handleCloseDashboard}
              // onBlur={handleClose}
              id={habit.id}
              name={habit.habit_name}
              key={habit.id}
            >
              {habit.habit_name}
            </MenuItem>
          );
        })}
      </Menu>

      <Button
        id="basic-button"
        aria-controls={openStyles ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openStyles ? "true" : undefined}
        onClick={handleClickStyles}
        sx={{
          backgroundColor: "white",
          opacity: 0.8,
          borderRadius: 1,
          marginLeft: 1,
        }}
      >
        Styles
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElStyles}
        open={openStyles}
        onClose={handleCloseStyles}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {colorStyles.map((style) => {
          return (
            <MenuItem
              onClick={handleClickGraphStyle}
              onClose={handleCloseStyles}
              id={style}
              key={style}
            >
              {style}
            </MenuItem>
          );
        })}
      </Menu>

      <h1 className="white-text">{currentHabitName}</h1>

      <div className="contribution-graph-container">
        {habits.map((habit) => {
          if (habit.id === currentHabitId) {
            return (
              <ContributionGraph
                timestamps={habit.timestamps}
                id={habit.id}
                add_timestamps={addTimestamps}
                color={currentStyle}
                randomColor={randomColor}
                key={habit.id}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Analytics;
