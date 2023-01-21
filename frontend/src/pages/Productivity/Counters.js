// counter page to help track based on timing since last, should have good and bad counters
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import axios from "axios";

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
  // function wait(duration) {
  //   return new Promise((resolve) => setTimeout(resolve, duration));
  // }

  const getCountersQuery = useQuery({
    queryKey: ["counters"],
    queryFn: getCounters,
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
    mutationFn: createCounter,
    onSuccess: () => {
      queryClient.invalidateQueries(["counters"]);
    },
  });

  function createCounter() {
    return axios
      .post("/api/counter-create", {
        user_id: props.userId,
        counter_name: newCounterName,
        id: nanoid(),
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
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

    return axios
      .post("/api/counter-add-timestamp", {
        user_id: props.userId,
        id: currentCounterId,
        timestamps: currentTime(),
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
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
