// counter page to help track based on timing since last, should have good and bad counters
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import axios from "axios"; // axios is better with react query than fetch because fetch doesn't treat 4xx errors as failed promises

import CounterContainer from "../../components/Counters/CounterContainer";
import LoadingSpinner from "../../components/LoadingSpinner.js";
import LoadingError from "../../components/LoadingError.js";

function Counter(props) {
  const [newCounterName, setNewCounterName] = useState("");
  const [currentCounterId, setCurrentCounterId] = useState("");

  useEffect(() => {
    document.title = props.title;
  }, []);

  function handleChange(event) {
    setNewCounterName(event.target.value);
  }

  // helps log the counterID for troubleshooting
  // useEffect(() => {
  //   console.log(currentCounterId);
  // }, [currentCounterId]);

  // react query
  const queryClient = useQueryClient();

  // use this to test out if loading is working
  function wait(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  const getCountersQuery = useQuery({
    queryKey: ["counters"],
    queryFn: () => wait(1).then(getCounters),
    refetchOnWindowFocus: false,
  });

  function getCounters() {
    return axios
      .post("/api/counter-get", {
        user_id: props.userId,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const newCounterMutation = useMutation({
    mutationFn: () => wait(1).then(createCounter),
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
    mutationFn: () => wait(1).then(addCounterTimestamps),
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

  if (getCountersQuery.isLoading) {
    return (
      <div className="tw-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (getCountersQuery.isError) {
    console.log("error");
    return (
      <div className="tw-h-screen">
        <LoadingError />
      </div>
    );
  }

  return (
    <div className="tw-h-screen tw-font-Poppins">
      <div className="tw-pt-10 tw-pl-10">
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
      </div>
      <CounterContainer
        setCurrentCounterId={setCurrentCounterId}
        currentCounterId={currentCounterId}
        counters={getCountersQuery.data}
        newCounterTimestamp={newCounterTimestamp}
      />
    </div>
  );
}

export default Counter;
