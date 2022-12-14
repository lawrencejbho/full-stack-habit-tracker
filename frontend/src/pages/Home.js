import React from "react";

import Button from "@mui/material/Button";

function Home() {
  const handleClick = async () => {
    fetch("/auth/google");
  };

  return (
    <div className="home-container">
      <h1 className="white-text">Home</h1>
      <a href="/auth/google">
        <Button variant="contained" onClick={handleClick}>
          Sign In With Google
        </Button>
      </a>
    </div>
  );
}

export default Home;
