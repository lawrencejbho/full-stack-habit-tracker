export default function convertUnixToDate(timestamp) {
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
