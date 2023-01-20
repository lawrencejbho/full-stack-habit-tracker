import React, { useState, useEffect } from "react";
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

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [userId, setUserId] = useState("");

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
    // remove the habit in state first then remove in database, this will make the website look a lot more snappy
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== currentHabitId)
    );

    // add in the id into delete array to be bulk deleted in database
    setHabitsDeleteArray((prevValue) => {
      return [...prevValue, currentHabitId];
    });
  }

  const QueryForSessionId = () => {
    useEffect(() => {
      const getUserId = async () => {
        const data = await fetch("/auth/get-session-id");
        const get_data = await data.json();
        setUserId(get_data);
        // console.log(get_data);
        props.sharedUserId(get_data);
      };
      getUserId();
    }, []);
  };

  QueryForSessionId();

  // setHabits to pull from our database
  // * currently we are making two api calls and should set a condition to only check if string length.  I think this is why the loading spinner isn't correct either.
  useEffect(() => {
    const getHabits = async () => {
      setIsLoading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      };
      try {
        const data = await fetch("/api/habit-get", requestOptions);
        const get_data = await data.json();
        // console.log(get_data);
        setHabits(get_data);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(true);
        setIsLoading(false);
      }
    };
    if (userId.length > 1) {
      getHabits();
    }
  }, [renderState, userId]);

  // will try to push today timestamps if the first entry is greater than a day on the backend.  If we get a success, then we'll also clear the today_timestamps for all habits
  // the problem with this right now is that it won't rerender habit tracker

  const CheckTodayTimestamps = () => {
    useEffect(() => {
      fetch("/api/habit-push-today-timestamps")
        .then((res) => {
          if (res.status === 200) {
            fetch("/api/habit-clear-today-timestamps").then((res) => {
              setRenderState((prevValue) => !prevValue); // trying to see if this fixes the problem so we'll update our habits
              console.log("pushed today timestamps to timestamps");
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  };

  CheckTodayTimestamps();

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
      console.log("creating");
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
      console.log("deleting");
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

          {isLoading && <LoadingSpinner />}
          {!errorMessage ? (
            <Habit
              habits={habits}
              plusCounter={plusCounter}
              minusCounter={minusCounter}
              deleteHabit={deleteHabit}
              setCurrentHabitId={setCurrentHabitId}
            />
          ) : (
            <LoadingError />
          )}
        </div>
      </main>
    </>
  );
}

export default HabitTracker;
