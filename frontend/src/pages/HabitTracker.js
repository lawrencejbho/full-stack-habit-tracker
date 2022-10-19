import React, { useState, useEffect } from "react";
import Habit from "../components/Habit.js";
import HabitAdd from "../components/Habit-Add.js";
import TodayDate from "../components/TodayDate.js";
import ContributionGraph from "../components/ContributionGraph.js";

function HabitTracker() {
  const [habitsAddArray, setHabitsAddArray] = useState([]);
  const [habitsDeleteArray, setHabitsDeleteArray] = useState([]);

  // any updates to habits will go into this array to be bulk pushed into the database
  const [habitsUpdateArray, setHabitsUpdateArray] = useState([]);

  const [habits, setHabits] = useState([]);

  // this help us track the current Habit Id, allows us to very easily track a Habit based on the ID when we use things like mouseOver
  const [currentHabitId, setCurrentHabitId] = useState("");

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

  // setHabits to pull from our database
  useEffect(() => {
    const getHabits = async () => {
      const data = await fetch("/api/habit-get");
      const get_data = await data.json();
      // console.log(get_data);
      setHabits(get_data);
    };
    getHabits();
  }, []);

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
    async function updateTimestamps() {
      for (const habit of habitsUpdateArray) {
        let data = {
          habit_name: habit.habit_name,
          today_timestamps: habit.today_timestamps,
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
    <>
      <main>
        <div className="card-container">
          <HabitAdd onAdd={addHabit} setCurrentHabitId={setCurrentHabitId} />
          <Habit
            habits={habits}
            plusCounter={plusCounter}
            minusCounter={minusCounter}
            deleteHabit={deleteHabit}
            setCurrentHabitId={setCurrentHabitId}
          />
          <TodayDate />
        </div>
      </main>
    </>
  );
}

export default HabitTracker;
