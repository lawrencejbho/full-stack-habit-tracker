import React from "react";
import {
  GoogleLoginButton,
  GithubLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";

import Button from "@mui/material/Button";

import Mango from "../images/mango.png";

function Home() {
  return (
    <div className="home-container">
      <div className="home-heading">
        <img className="main-mango-icon" src={Mango} alt="mango-icon" />
        <h1 className="black-text">HaTr</h1>
      </div>

      <div className="home-login-button-container">
        <a href="/auth/github">
          <GithubLoginButton />
        </a>
        <div className="separator" />

        <a href="/auth/google">
          <GoogleLoginButton />
        </a>

        <div className="separator" />
        <a href="/auth/facebook">
          <FacebookLoginButton />
        </a>
        <div className="separator" />
      </div>

      <a href="/productivity/habit">
        <Button
          style={{
            margin: "5px",
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
