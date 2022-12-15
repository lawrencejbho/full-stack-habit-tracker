import React from "react";
import {
  GoogleLoginButton,
  GithubLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";

import Button from "@mui/material/Button";

import Mango from "../images/mango.png";

const buttonStyle = {
  width: "250px",
  margin: "auto",
};

function Home() {
  const handleClick = async () => {
    fetch("/auth/google");
  };

  return (
    <div className="home-container">
      <div className="home-heading">
        <img className="main-mango-icon" src={Mango} alt="mango-icon" />
        <h1 className="black-text">HaTr</h1>
      </div>

      <a href="/auth/github">
        <GithubLoginButton style={buttonStyle} />
      </a>

      <div className="separator" />

      <a href="/auth/google">
        <GoogleLoginButton style={buttonStyle} onClick={handleClick} />
      </a>

      <div className="separator" />

      <a href="/auth/facebook">
        <FacebookLoginButton style={buttonStyle} />
      </a>

      <div className="separator" />

      <a href="/productivity/habit">
        <Button
          style={{
            margin: "15px",
            padding: "5px",
            fontFamily: "Rosario",
            fontWeight: "bold",
          }}
        >
          Access Test Environment without Logging In
        </Button>
      </a>
    </div>
  );
}

export default Home;
