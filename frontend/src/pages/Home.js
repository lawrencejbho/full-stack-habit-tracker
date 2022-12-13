import React from "react";

import Button from "@mui/material/Button";

function Home() {
  return (
    <div className="home-container">
      <h1 className="white-text">Home</h1>
      <a href="/auth/google">
        <Button variant="contained">Sign In With Google</Button>
      </a>
    </div>
  );
}

export default Home;
