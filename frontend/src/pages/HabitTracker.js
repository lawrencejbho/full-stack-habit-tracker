import React, { useState, useEffect } from "react";
import Habit from "../components/Habit.js";
import HabitAdd from "../components/Habit-Add.js";
import TodayDate from "../components/TodayDate.js";
// import ContributionGraph from "../components/ContributionGraph.js";

function HabitTracker() {
  const [habitsAddArray, setHabitsAddArray] = useState([]);
  const [habitsDeleteArray, setHabitsDeleteArray] = useState([]);

  // our habits array that saves our habits to be displayed later, will use the localStorage if it exists
  const [habits, setHabits] = useState([]);

  // this help us track the current Habit Id, allows us to very easily track a Habit based on the ID when we use things like mouseOver
  const [currentHabitId, setCurrentHabitId] = useState(
    (habits[0] && habits[0].id) || ""
  );

  // const [isReady, setIsReady] = useState(false);

  // checks for the proper ID and will increment it's counter value by 1
  function plusCounter() {
    setHabits((prevHabits) =>
      prevHabits.map((prevHabit) => {
        return prevHabit.id === currentHabitId
          ? { ...prevHabit, counter: prevHabit.counter + 1 }
          : prevHabit;
      })
    );
  }

  function minusCounter() {
    setHabits((prevHabits) =>
      prevHabits.map((prevHabit) => {
        return prevHabit.id === currentHabitId
          ? { ...prevHabit, counter: prevHabit.counter - 1 }
          : prevHabit;
      })
    );
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

  // setHabits initially to be what's in the database
  useEffect(() => {
    const getHabits = async () => {
      const data = await fetch("/api/habit-get");
      const get_data = await data.json();
      // console.log(get_data);
      setHabits(get_data);
    };
    getHabits();
  }, []);

  useEffect(() => {
    async function createManyHabits() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitsAddArray),
      };

      fetch("/api/habit-create-many", requestOptions).then(
        setHabitsAddArray(() => {
          return [];
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
          return [];
        })
      );
      console.log("deleting");
    }

    function checkAfterFiveMinutes() {
      console.log("habitAddArray" + habitsAddArray);
      console.log("habitDeleteArray" + habitsDeleteArray);

      if (habitsAddArray.length > 0) {
        createManyHabits();
      }
      if (habitsDeleteArray.length > 0) {
        deleteManyHabits();
      }
    }
    const timer = setInterval(() => checkAfterFiveMinutes(), 10000);
    return () => clearInterval(timer);
  }, [habitsAddArray, habitsDeleteArray]);

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
