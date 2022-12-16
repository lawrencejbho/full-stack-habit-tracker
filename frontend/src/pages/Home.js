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
    <>
      <div className="home-container">
        <div className="home-heading">
          <h1 className="home-title">HaTr</h1>
        </div>

        <div className="headline-container">
          <p className="headline">Track your habits and make progress daily </p>
          <div className="feature-container">
            <div className="feature-text">
              <h5>Pomodoro</h5>
              <h6>Timers with built in desktop notifications</h6>
            </div>
          </div>

          <div className="feature-container">
            <div className="feature-text">
              <h5>Analytics</h5>
            </div>
          </div>
        </div>

        <a
          href="https://github.com/lawrencejbho/habit-tracker"
          className="github-link"
        >
          GITHUB
        </a>

        <div className="access-container">
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
      </div>
    </>
  );
}

export default Home;
