import React, { useState } from "react";
import TimezoneSelect from "react-timezone-select";
import Cafe from "../../images/cafe.jpg";

export default function UserSettings() {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ); // the Intl browser API allows us to set the default state value to the user's timezone

  // need to add some logic so that it'll first check if the database value exists, if so then use that timezone, if not then use the browser default

  const backgroundImage = {
    backgroundImage: `url(${Cafe})`,
    backgroundSize: "cover",
    height: "100vh",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <div className="main-body" style={backgroundImage}>
        <div className="tw-bg-gray-300 tw-mx-10 tw-border tw-mt-10 tw-rounded-xl">
          <div className="tw-font-Poppins tw-px-10 tw-py-4 tw-text-justify">
            <h2 className="tw-font-normal tw-text-2xl ">Settings</h2>

            <h3>TimeZone</h3>
            <TimezoneSelect
              value={selectedTimezone}
              onChange={setSelectedTimezone}
            />

            <h3>Background Image</h3>
            <button>Upload</button>
          </div>
          <div className="tw-flex  tw-justify-end tw-mr-6 tw-pb-6">
            <button>Update</button>
          </div>
        </div>
      </div>
    </>
  );
}
