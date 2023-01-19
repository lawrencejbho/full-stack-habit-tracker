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

  function currentTime() {
    const currentTime = new Date().getTime();
    return Math.floor(currentTime / 1000);
  }

  function daysSinceLastTimestamp(timestamp) {
    let time = currentTime() - timestamp;
    let days = Math.floor(time / 86400);
    return days;
  }

  return (
    <div className=" tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-flex-1 tw-gap-5 tw-mt-10">
      {props.counters.map((item, index) => (
        <div
          className="tw-bg-sky-500  tw-rounded-xl  tw-p-10  hover:tw-bg-sky-700 tw-basis-11/12  md:tw-basis-5/12  lg:tw-basis-1/4"
          onMouseOver={
            props.newCounterTimestamp.isLoading
              ? null
              : () => props.setCurrentCounterId(item.id)
          }
          key={item.id}
        >
          <div>{item.counter_name}</div>
          <div>
            {item.timestamps.length > 0
              ? convertUnixToDate(item.timestamps[item.timestamps.length - 1])
              : null}
          </div>
          <button
            onClick={() => props.newCounterTimestamp.mutate()}
            disabled={
              props.newCounterTimestamp.isLoading &&
              item.id == props.currentCounterId
            }
          >
            Add Timestamp
          </button>
          <h3>
            {`${daysSinceLastTimestamp(
              item.timestamps[item.timestamps.length - 1]
            )} Days since Last`}
          </h3>
        </div>
      ))}
    </div>
  );
}
