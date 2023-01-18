// counter page to help track based on timing since last, should have good and bad counters
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function Counter(props) {
  const [newCounterName, setNewCounterName] = useState("");
  const [userCounters, setUserCounters] = useState({});
  const [currentCounterName, setCurrentCounterName] = useState("");

  useEffect(() => {
    document.title = props.title;
  }, []);

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
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("/api/counter-create", requestOptions).then((res) => res);
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

  function handleChange(event) {
    setNewCounterName(event.target.value);
  }

  if (getCountersQuery.isLoading) {
    return <h1>Loading....</h1>;
  }
  if (getCountersQuery.error) {
    return <pre>{JSON.stringify(getCountersQuery.error)}</pre>;
  }
  if (newCounterMutation.isLoading) {
    console.log("loading");
  }

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
        disabled={newCounterMutation.isLoading}
        onClick={() => newCounterMutation.mutate()}
      >
        New Counter
      </button>

      <div className="tw-mt-20 tw-flex tw-justify-center tw-items-center">
        {getCountersQuery.data.map((item) => (
          <div className="tw-bg-blue-500 tw-h-20 tw-rounded-md  tw-container tw-mb-10 tw-m-10 ">
            <div>{item.counter_name}</div>
            <div>{item.timestamp ? item.timestamp : null}</div>
            <button onClick={() => newCounterTimestamp.mutate()}>
              Add Timestamp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Counter;
