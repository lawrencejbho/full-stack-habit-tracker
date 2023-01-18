export default function CounterContainer(props) {
  function convertUnixToDate(timestamp) {
    let date = new Date(timestamp * 1000);
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const todayDateString = `${
      month[date.getMonth()]
    } ${date.getDate()} ${date.getFullYear()}`;

    return todayDateString;
  }

  return (
    <div className=" tw-flex  tw-justify-center tw-items-center tw-flex-wrap tw-flex-1">
      {props.counters.map((item) => (
        <div
          className="tw-bg-blue-500  tw-rounded-xl  tw-container tw-mb-10 tw-m-10 tw-basis-1/4 tw-p-10 tw-h-40 hover:tw-bg-blue-700"
          onMouseOver={() => props.currentCounterId(item.id)}
          key={item.id}
        >
          <div>{item.counter_name}</div>
          <div>
            {item.timestamps.length > 0
              ? convertUnixToDate(item.timestamps[item.timestamps.length - 1])
              : null}
          </div>
          <button onClick={() => props.newCounterTimestamp.mutate()}>
            Add Timestamp
          </button>
        </div>
      ))}
    </div>
  );
}
