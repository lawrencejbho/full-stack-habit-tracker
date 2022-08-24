import React from "react";
import Box from "./Box.js";
import FakeData from "./FakeData.js";

function ContributionGraph() {
  return (
    <div className="box-container">
      {FakeData.map((entry) => (
        <Box contributions={entry.contributions} />
      ))}
    </div>
  );
}

export default ContributionGraph;
