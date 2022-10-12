import React, { useEffect, useState } from "react";
import PomodoroTimer from "./PomodoroTimer.js";
import "./pomodoro.css";
import ContributionGraph from "../components/ContributionGraph";
import mango from "../images/mango.png";

function Pomodoro() {
  const [secondsPomodoro, setSecondsPomodoro] = useState(2);
  const [secondsBreak, setSecondsBreak] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const pomodoroTimeDisplay = timeConversion(secondsPomodoro);
  const breakTimeDisplay = timeConversion(secondsBreak);

  // for submitting pomodoros
  const [pomodoroFormData, setPomodoroFormData] = useState({});
  // for pulling pomodoros from the db
  const [pomodoroDatabase, setPomodoroDatabase] = useState([]);

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

    // add to the pomodoros array in the database when a pomodoro is complete
    async function updatePomodorosArray(event) {
      let data = { username: "test-user", pomodoro: currentTime() };
      console.log(data);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      fetch("/api/pomodoro-add-pomodoros", requestOptions).then((response) => {
        console.log(response);
        return response.json();
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
      updatePomodorosArray();
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

  // add to the pomodoros array on the database
  async function handleSubmit(event) {
    console.log(pomodoroFormData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pomodoroFormData),
    };

    fetch("/api/pomodoro-add-pomodoros", requestOptions).then((response) => {
      console.log(response);
      return response.json();
    });
  }

  function handleChangeUsername(event) {
    setPomodoroFormData({ ...pomodoroFormData, username: event.target.value });
  }

  function handleChangePomodoro(event) {
    setPomodoroFormData({ ...pomodoroFormData, pomodoro: event.target.value });
  }

  // get pomodoros from database and save to state to be passed down
  // probably better to do it here versus within the contribution graph component
  useEffect(() => {
    const getPomodoros = async () => {
      const data = await fetch("/api/pomodoro-get");
      const posts_data = await data.json();
      setPomodoroDatabase(posts_data[0].pomodoros);
    };
    getPomodoros();
  }, []);

  // update the calendar Schema in case it's older than today's date
  // when I put this in ContributionGraph it was double counting pomodoros

  useEffect(() => {
    const updateCalendar = async () => {
      const data = await fetch("/api/calendar-update");
      const get_data = await data.json();
      console.log(get_data);
    };
    updateCalendar();
  }, []);

  return (
    <div>
      <h1 className="white-text">Pomodoro</h1>
      <hr className="app-line"></hr>
      <div>
        <form className="white-text" onSubmit={handleSubmit}>
          <label>
            username
            <input
              type="text"
              name="username"
              onChange={handleChangeUsername}
              value={pomodoroFormData.username || ""}
            />
          </label>
          <label>
            pomodoro
            <input
              type="text"
              name="pomodoro"
              onChange={handleChangePomodoro}
              value={pomodoroFormData.pomodoro || ""}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
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
      <ContributionGraph pomodoros={pomodoroDatabase} />
    </div>
  );
}

export default Pomodoro;
