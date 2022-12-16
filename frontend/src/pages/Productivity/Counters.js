// counter page to help track based on timing since last, should have good and bad counters
import React, { useEffect, useState } from "react";

function Counter(props) {
  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <div>
      <h1> test</h1>
      <input type="search" />
    </div>
  );
}

export default Counter;
