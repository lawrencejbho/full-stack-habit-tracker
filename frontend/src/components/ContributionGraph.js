import React from "react";
import Box from "./Box.js";
import FakeData from "./FakeData.js";

function ContributionGraph() {
  return (
    <div className="outer-box-box-container">
      <div className="box-container">
        {FakeData.map((entry) => (
          <Box contributions={entry.contributions} date={entry.date} />
        ))}
      </div>
    </div>
  );
}

export default ContributionGraph;
