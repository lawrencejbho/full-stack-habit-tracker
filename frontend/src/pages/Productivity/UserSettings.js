import React, { useState } from "react";
import TimezoneSelect from "react-timezone-select";

export default function UserSettings() {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ); // the Intl browser API allows us to set the default state value to the user's timezone

  // need to add some logic so that it'll first check if the database value exists, if so then use that timezone, if not then use the browser default

  return (
    <>
      <div className="main-body">
        <div className="tw-bg-gray-300 tw-mx-10 tw-border tw-mt-10 tw-rounded-xl">
          <div className="tw-font-Poppins tw-px-10 tw-py-4 tw-text-justify">
            <h2 className="tw-font-normal tw-text-2xl ">Settings</h2>

            <h3>TimeZone</h3>
            <TimezoneSelect
              value={selectedTimezone}
              onChange={setSelectedTimezone}
            />

            <button>Update</button>
          </div>
        </div>
      </div>
    </>
  );
}
