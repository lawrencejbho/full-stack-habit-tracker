// * keeping this code in here for later.  This used to be a way to manually add in timestamps which is still a decent feature but can be put somewhere else.

function manualTimestamps() {
  // add to the pomodoros array on the database
  async function handleSubmit(event) {
    console.log(pomodoroFormData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pomodoroFormData),
    };

    fetch("/api/pomodoro-add-pomodoros", requestOptions).then((response) => {
      console.log(response);
      return response.json();
    });
  }

  function handleChangeUsername(event) {
    setPomodoroFormData({ ...pomodoroFormData, username: event.target.value });
  }

  function handleChangePomodoro(event) {
    setPomodoroFormData({ ...pomodoroFormData, pomodoro: event.target.value });
  }

  return (
    <div>
      <form className="white-text" onSubmit={handleSubmit}>
        <label>
          username
          <input
            type="text"
            name="username"
            onChange={handleChangeUsername}
            value={pomodoroFormData.username || ""}
          />
        </label>
        <label>
          pomodoro
          <input
            type="text"
            name="pomodoro"
            onChange={handleChangePomodoro}
            value={pomodoroFormData.timestamps || ""}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
