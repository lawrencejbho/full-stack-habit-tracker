// counter page to help track based on timing since last, should have good and bad counters
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import CounterContainer from "../../components/Counters/CounterContainer";

function Counter(props) {
  const [newCounterName, setNewCounterName] = useState("");
  const [userCounters, setUserCounters] = useState({});
  const [currentCounterId, setCurrentCounterId] = useState("");

  useEffect(() => {
    document.title = props.title;
  }, []);

  useEffect(() => {
    console.log(currentCounterId);
  }, [currentCounterId]);

  // react query
  const queryClient = useQueryClient();

  const getCountersQuery = useQuery({
    queryKey: ["counters"],
    queryFn: getCounters,
  });

  function getCounters() {
    let data = {
      user_id: props.userId,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return fetch("/api/counter-get", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setUserCounters(res);
        return res; // need to return here or it gives an error that this returns undefined this value is "data"
      });
  }

  const newCounterMutation = useMutation({
    mutationFn: createCounter,
    onSuccess: () => {
      queryClient.invalidateQueries(["counters"]);
    },
  });

  function createCounter() {
    let data = {
      user_id: props.userId,
      counter_name: newCounterName,
      id: nanoid(),
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    return fetch("/api/counter-create", requestOptions).then();
  }

  const newCounterTimestamp = useMutation({
    mutationFn: addCounterTimestamps,
    onSuccess: () => {
      queryClient.invalidateQueries(["counters"]);
    },
  });

  function addCounterTimestamps() {
    const currentTime = () => {
      const currentTime = new Date().getTime();
      return Math.floor(currentTime / 1000);
    };

    let data = {
      user_id: props.userId,
      id: currentCounterId,
      timestamps: currentTime(),
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    return fetch("/api/counter-add-timestamp", requestOptions).then();
  }

  function handleChange(event) {
    setNewCounterName(event.target.value);
  }

  if (getCountersQuery.isLoading) {
    return <h1>Loading....</h1>;
  }
  // if (getCountersQuery.error) {
  //   return <pre>{JSON.stringify(getCountersQuery.error)}</pre>;
  // }
  // if (newCounterMutation.isLoading) {
  //   console.log("loading");
  // }

  return (
    <div className="tw-h-screen">
      <input
        type="text"
        placeholder="Enter your counter's name"
        className=""
        value={newCounterName}
        onChange={handleChange}
      ></input>
      <button
        // disabled={newCounterMutation.isLoading}
        onClick={() => newCounterMutation.mutate()}
      >
        New Counter
      </button>

      <CounterContainer
        currentCounterId={setCurrentCounterId}
        counters={getCountersQuery.data}
        newCounterTimestamp={newCounterTimestamp}
      />
    </div>
  );
}

export default Counter;
