import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Habit from "../../components/Habit.js";
import HabitAdd from "../../components/Habit-Add.js";
import TodayDate from "../../utils/TodayDate.js";
import LoadingSpinner from "../../components/LoadingSpinner.js";
import LoadingError from "../../components/LoadingError.js";

/* 
I need to move the useEffect's into their own custom functions to make it easier to see what is actually happening 
*/

function HabitTracker(props) {
  const [habitsAddArray, setHabitsAddArray] = useState([]);
  const [habitsDeleteArray, setHabitsDeleteArray] = useState([]);

  // any updates to habits will go into this array to be bulk pushed into the database
  const [habitsUpdateArray, setHabitsUpdateArray] = useState([]);

  const [habits, setHabits] = useState([]);

  // this help us track the current Habit Id, allows us to very easily track a Habit based on the ID when we use things like mouseOver
  const [currentHabitId, setCurrentHabitId] = useState("");
  const [renderState, setRenderState] = useState(false);

  const [userId, setUserId] = useState("");

  const queryClient = useQueryClient();

  const currentTime = () => {
    const currentTime = new Date().getTime();
    return Math.floor(currentTime / 1000);
  };

  // modifying both the habits array and update array in one go
  // checks for the proper ID and will add timestamps
  function plusCounter() {
    const time = currentTime(); // make sure we have consistent timestamp

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
                  today_timestamps: [...prevHabit.today_timestamps, time],
                };
              } else {
                return prevUpdate;
              }
            })
          );
          // update the timestamps in the habits array
          return {
            ...prevHabit,
            today_timestamps: [...prevHabit.today_timestamps, time], // use spread here instead of push works better for state
          };
        } else {
          return prevHabit;
        }
      })
    );
    // console.log(habitsUpdateArray);
  }

  // same logic as add except we'll use slice to remove the latest timestamp
  function minusCounter() {
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
          // modify the updates array if the habit already exists
          setHabitsUpdateArray((prevUpdates) =>
            prevUpdates.map((prevUpdate) => {
              if (prevUpdate.id === currentHabitId) {
                return {
                  ...prevUpdate,
                  today_timestamps: [
                    ...prevUpdate.today_timestamps.slice(
                      0,
                      prevUpdate.today_timestamps.length - 1
                    ),
                  ], // apparently this slice method is a good way of doing this without mutating the original array, also we can't go negative with this
                };
              } else {
                return prevUpdate;
              }
            })
          );
          // same logic in the habits array as the update array
          return {
            ...prevHabit,
            today_timestamps: [
              ...prevHabit.today_timestamps.slice(
                0,
                prevHabit.today_timestamps.length - 1
              ),
            ], // apparently this slice method is a good way of doing this without mutating the original array, also we can't go negative with this
          };
        } else {
          return prevHabit;
        }
      })
    );
    // console.log(habitsUpdateArray);
  }

  // this only needs to help with a render now and then we'll call our database again to update our habits
  function addHabit(newHabit) {
    setHabits((prevHabits) => {
      return [...prevHabits, newHabit];
    });
    // add the new Habit into the habits Array to be bulk pushed into database
    setHabitsAddArray((prevValue) => {
      return [...prevValue, newHabit];
    });
  }

  // Use filter to keep everything but the currentHabitId which comes when we mouseOver
  function deleteHabit() {
    // this is to prevent people from randomly deleting my habits
    const personal_habits = [
      "Jj1cbuUei5O4vFWJYcinA",
      "yG0fmUKfLkxcYiWZmzzxP",
      "Vrn7Vx6tn4LmaswvyXYzm",
      "nK52HzHw1xiWo0rdbIlYr",
    ];

    let return_function = false;

    personal_habits.forEach((item) => {
      if (item === currentHabitId) {
        console.log(item);
        return_function = true;
        return;
      }
    });

    if (return_function) {
      return;
    }

    // remove the habit in state first then remove in database, this will make the website look a lot more snappy
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== currentHabitId)
    );

    // add in the id into delete array to be bulk deleted in database
    setHabitsDeleteArray((prevValue) => {
      return [...prevValue, currentHabitId];
    });
  }

  // React Queries

  const getSessionIdQuery = useQuery({
    queryKey: ["sessionID"],
    queryFn: getSessionId,
    refetchOnWindowFocus: false,
  });

  function getSessionId() {
    return axios
      .get("/auth/get-session-id")
      .then((response) => {
        setUserId(response.data);
        props.sharedUserId(response.data);
        return response.data;
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  // this will send after the sessionId is updated
  const getHabitsQuery = useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
    enabled: userId != "",
    refetchOnWindowFocus: false,
  });

  function getHabits() {
    return axios
      .post("/api/habit-get", {
        user_id: userId,
      })
      .then(function (response) {
        setHabits(response.data);
        return response.data;
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  // will try to push today timestamps if the first entry is greater than a day on the backend.  If we get a success, then we'll also clear the today_timestamps for all habits
  // the problem with this right now is that it won't rerender habit tracker

  const pushTodayTimestampsQuery = useQuery({
    queryKey: ["push-today-timestamps"],
    queryFn: pushTodayTimestamps,
    refetchOnWindowFocus: false,
  });

  function pushTodayTimestamps() {
    return axios
      .get("/api/habit-push-today-timestamps")
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const clearTodayTimestampsQuery = useQuery({
    queryKey: ["clear-today-timestamps"],
    queryFn: clearTodayTimestamps,
    enabled: pushTodayTimestampsQuery?.data?.status == 200,
    refetchOnWindowFocus: false,
  });

  function clearTodayTimestamps() {
    return axios
      .get("/api/habit-clear-today-timestamps")
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  // add and removes for habits are done in state and then put into respective arrays so that they'll make a database call every 10 seconds
  useEffect(() => {
    async function createManyHabits() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitsAddArray),
      };

      fetch("/api/habit-create-many", requestOptions).then(
        setHabitsAddArray(() => {
          return []; // clear the array once we make the call, might need to change this to track errors
        })
      );
      // console.log("creating");
    }

    async function deleteManyHabits() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitsDeleteArray),
      };
      fetch("/api/habit-delete-many", requestOptions).then(
        setHabitsDeleteArray(() => {
          return []; // clear the array once we make the call, might need to change this to track errors
        })
      );
      // console.log("deleting");
    }

    // I'm not sure in the current setup whether there will be multiple calls being made
    // but I think this will work for now using the if statements and then clearing out the arrays once the database call goes through
    function checkAfterTenSeconds() {
      if (habitsAddArray.length > 0) {
        createManyHabits();
      }
      if (habitsDeleteArray.length > 0) {
        deleteManyHabits();
      }
    }
    const timer = setInterval(() => checkAfterTenSeconds(), 10000);
    return () => clearInterval(timer);
  }, [habitsAddArray, habitsDeleteArray]);

  // timestamps for each habit are updated every 10 seconds but dividing it out into it's own useEffect
  // I am using the habitsUpdate array so that we're not constantly pushing updates onto the database and we'll only make calls for habits that are getting modified
  useEffect(() => {
    async function updateTodayTimestamps() {
      for (const habit of habitsUpdateArray) {
        let data = {
          user_id: userId,
          habit_name: habit.habit_name,
          today_timestamps: habit.today_timestamps,
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
        fetch("/api/habit-update-today-timestamps", requestOptions).then(
          setHabitsUpdateArray(() => {
            return []; // clear out the array when we're done updating
          })
        );
      }
    }

    function checkAfterTenSeconds() {
      updateTodayTimestamps();
    }
    const timer = setInterval(() => checkAfterTenSeconds(), 10000);
    return () => clearInterval(timer);
  }, [habitsUpdateArray]);

  useEffect(() => {
    document.title = props.title;
  }, []);

  if (
    getSessionIdQuery.isLoading ||
    getHabitsQuery.isLoading ||
    getSessionIdQuery.isFetching ||
    getHabitsQuery.isFetching
  ) {
    return (
      <div className="tw-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (getSessionIdQuery.isError || getHabitsQuery.isError) {
    console.log("error");
    return (
      <div className="tw-h-screen">
        <LoadingError />
      </div>
    );
  }

  return (
    <>
      <main>
        <div className="card-container">
          <TodayDate />
          <div className="break"></div>
          <HabitAdd
            onAdd={addHabit}
            setCurrentHabitId={setCurrentHabitId}
            userId={userId}
          />
          <div className="break"></div>

          <Habit
            habits={habits}
            plusCounter={plusCounter}
            minusCounter={minusCounter}
            deleteHabit={deleteHabit}
            setCurrentHabitId={setCurrentHabitId}
          />
        </div>
      </main>
    </>
  );
}

export default HabitTracker;
