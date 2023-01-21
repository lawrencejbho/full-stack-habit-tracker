import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import PomodoroTimer from "../../components/PomodoroTimer.js";
import ContributionGraph from "../../components/ContributionGraph";
import mango from "../../images/mango.png";
import "./pomodoro.css";

import LoadingSpinner from "../../components/LoadingSpinner.js";
import LoadingError from "../../components/LoadingError.js";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Pomodoro(props) {
  const [secondsPomodoro, setSecondsPomodoro] = useState(1500);
  const [secondsBreak, setSecondsBreak] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const pomodoroTimeDisplay = timeConversion(secondsPomodoro);
  const breakTimeDisplay = timeConversion(secondsBreak);

  const [habits, setHabits] = useState([]);
  const [currentHabitId, setCurrentHabitId] = useState("");
  const [currentHabitName, setCurrentHabitName] = useState("");

  const queryClient = useQueryClient();

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
  // name is an attribute
  const handleClickDisplayGraph = (event) => {
    setCurrentHabitId(event.target.id);
    setCurrentHabitName(event.target.getAttribute("name"));
  };

  // react query

  // function wait(duration) {
  //   return new Promise((resolve) => setTimeout(resolve, duration));
  // }

  const getHabitsQuery = useQuery({
    queryKey: ["habits"],
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

  const updateHabitTimestampsQuery = useMutation({
    mutationFn: updateHabitTimestamps,
    onSuccess: () => queryClient.invalidateQueries(["habits"]),
  });

  function updateHabitTimestamps() {
    return axios
      .post("/api/habit-add-timestamps", {
        habit_name: currentHabitName,
        user_id: props.userId,
        timestamps: currentTime(),
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // not sure if this is the proper way to do this but I leave seconds as the state variable and use a normal variable that uses seconds with derived state
  function timeConversion(seconds) {
    let time = {};
    if (seconds > 0) {
      time = {
        minutes:
          Math.floor(seconds / 60) > 10
            ? Math.floor(seconds / 60)
            : `0${Math.floor(seconds / 60)}`,
        seconds: seconds % 60 >= 10 ? seconds % 60 : `0${seconds % 60}`,
      };
    } else if (seconds === 0) {
      time = {
        minutes: "00",
        seconds: "00",
      };
    }
    return time;
  }

  // first useEffect for the Pomodoro timer
  useEffect(() => {
    let interval = null;

    // local notification
    function notificationPermissionPomodoro() {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          const notification = new Notification("Pomodoro Finished", {
            body: "Start Break?",
            data: { test: "Data" },
            icon: mango,
          });
          // click the notification to immediately start break
          notification.addEventListener("click", (e) => {
            // console.log(e);
            resetBreak();
            toggleBreak();
          });
        }
      });
    }

    if (isActive && secondsPomodoro !== 0) {
      interval = setInterval(() => {
        setSecondsPomodoro((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && secondsPomodoro !== 0) {
      clearInterval(interval);
    } else if (isActive && secondsPomodoro === 0) {
      // need to check isActive here or you'll get two notifications
      setIsActive(false);
      notificationPermissionPomodoro();
      updateHabitTimestampsQuery.mutate();
      // this is similar code used in Analytics and HabitTracker, we update the frontend first so that the new contribution gets added immediately
      setHabits((prevHabits) =>
        prevHabits.map((prevHabit) => {
          if (prevHabit.id === currentHabitId) {
            // update the timestamps in the habits array
            return {
              ...prevHabit,
              timestamps: [...prevHabit.timestamps, currentTime()], // use spread here instead of push works better for state
            };
          } else {
            return prevHabit;
          }
        })
      );
    }
    return () => clearInterval(interval); // return clearInterval for clean up
  }, [isActive, secondsPomodoro]); // need isActive here in the dependency array to start the useEffect or secondsPomodoro will never go down

  // second useEffect for the Break timer, almost exactly the same
  useEffect(() => {
    let interval = null;

    // local notifications for Break finished
    function notificationPermissionBreak() {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          const notification = new Notification("Break Finished", {
            body: "Start Focusing?",
            data: { test: "Data" },
            icon: mango,
          });
          // click the notification to immediately start break
          notification.addEventListener("click", (e) => {
            // console.log(e);
            resetPomodoro();
            resetBreak();
            togglePomodoro();
          });
        }
      });
    }

    if (isBreakActive && secondsBreak !== 0) {
      interval = setInterval(() => {
        setSecondsBreak((seconds) => seconds - 1);
      }, 1000);
    } else if (!isBreakActive && secondsBreak !== 0) {
      clearInterval(interval);
    } else if (isBreakActive && secondsBreak === 0) {
      setIsBreakActive(false);
      notificationPermissionBreak();
    }
    return () => clearInterval(interval); // return clearInterval for clean up
  }, [isBreakActive, secondsBreak]);

  function togglePomodoro() {
    setIsActive((prev) => !prev);
  }

  function toggleBreak() {
    setIsBreakActive((prev) => !prev);
  }

  function resetPomodoro() {
    setSecondsPomodoro(1500);
    if (!isBreakActive) setSecondsBreak(300);
    setIsActive(false);
    // isPomodoro = false;
  }

  function resetBreak() {
    setSecondsBreak(300);
    setIsBreakActive(false);
  }

  // this seems to work for which one to display, I also tried checking for isActive but it didn't work as intended
  function startOrResumePomodoro() {
    if (secondsPomodoro === 1500) {
      return "Start";
    } else if (secondsPomodoro === 0) {
      return "Reset";
    } else {
      return "Resume";
    }
  }
  function startOrResumeBreak() {
    if (secondsBreak === 300) {
      return "Start";
    } else if (secondsBreak === 0) {
      return "Reset";
    } else {
      return "Resume";
    }
  }

  // get the current time in seconds
  const currentTime = () => {
    const currentTime = new Date().getTime();
    return Math.floor(currentTime / 1000);
  };

  //* this probably could be moved somewhere, also may just have the database update itself on a 24 hour basis
  useEffect(() => {
    const updateCalendar = async () => {
      const data = await fetch("/api/calendar-update");
      const get_data = await data.json();
      // console.log(get_data);
    };
    updateCalendar();
  }, []);

  // can pass in the title within the loaded element from react router and then change the document title here
  useEffect(() => {
    document.title = props.title;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (getHabitsQuery.isLoading) {
    return (
      <div className="tw-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (getHabitsQuery.isError) {
    console.log("error");
    return (
      <div className="tw-h-screen">
        <LoadingError />
      </div>
    );
  }

  return (
    <div className="main-body">
      <h1 className="black-text">Pomodoro</h1>
      <hr className="app-line"></hr>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
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
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {habits.map((habit, index) => {
          return (
            <MenuItem
              onClick={handleClickDisplayGraph}
              onClose={handleClose}
              // onBlur={handleClose}
              id={habit.id}
              name={habit.habit_name}
              key={index}
            >
              {habit.habit_name}
            </MenuItem>
          );
        })}
      </Menu>
      <h1 className="black-text">{currentHabitName}</h1>
      {currentHabitId !== "" ? (
        <div className="timer-container">
          <PomodoroTimer
            minutes={pomodoroTimeDisplay.minutes}
            seconds={pomodoroTimeDisplay.seconds}
            activePomodoro={isActive}
            activeBreak={isBreakActive}
            active={isActive}
            toggle={togglePomodoro}
            reset={resetPomodoro}
            startOrResume={startOrResumePomodoro}
            type="pomodoro"
          />
          <PomodoroTimer
            minutes={breakTimeDisplay.minutes}
            seconds={breakTimeDisplay.seconds}
            activePomodoro={isActive}
            activeBreak={isBreakActive}
            active={isBreakActive}
            toggle={toggleBreak}
            reset={resetBreak}
            startOrResume={startOrResumeBreak}
            type="break"
          />
        </div>
      ) : null}

      <div className="contribution-graph-container">
        {habits.map((habit, index) => {
          if (habit.id === currentHabitId) {
            return (
              <ContributionGraph
                timestamps={habit.timestamps}
                id={habit.id}
                color="Default"
                key={index}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default Pomodoro;
