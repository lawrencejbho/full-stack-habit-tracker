// counter page to help track based on timing since last, should have good and bad counters
import React, { useEffect, useState } from "react";

function Counter(props) {
  const [newCounterName, setNewCounterName] = useState("");
  const [userCounters, setUserCounters] = useState({});
  const [currentCounterName, setCurrentCounterName] = useState("");

  function handleChange(event) {
    setNewCounterName(event.target.value);
  }

  useEffect(() => {
    document.title = props.title;
  }, []);

  function GetCounters() {
    useEffect(() => {
      fetch("/api/counter-get")
        .then((res) => res.json())
        .then((res) => {
          setUserCounters(res);
        });
    }, []);
  }

  GetCounters();

  function createCounter() {
    let data = {
      user_id: props.userId,
      counter_name: newCounterName,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("/api/counter-create", requestOptions).then();
  }

  function addCounterTimestamps() {
    const currentTime = () => {
      const currentTime = new Date().getTime();
      return Math.floor(currentTime / 1000);
    };

    let data = {
      user_id: props.userId,
      counter_name: currentCounterName,
      timestamps: currentTime(),
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("/api/counter-add-timestamp", requestOptions).then();
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your counter's name"
        className=""
        value={newCounterName}
        onChange={handleChange}
      ></input>
      <button onClick={createCounter}>New Counter</button>
      <button onClick={addCounterTimestamps}>Add Timestamp </button>
    </div>
  );
}

export default Counter;
