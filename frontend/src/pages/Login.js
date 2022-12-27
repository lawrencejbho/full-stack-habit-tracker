import React from "react";
import {
  GoogleLoginButton,
  GithubLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import Mango from "../images/mango.png";

function Login() {
  return (
    <>
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

        <Link to="/productivity/habit">
          <Button
            style={{
              margin: "5px",
              padding: "5px",
              fontFamily: "Rosario",
              fontWeight: "bold",
            }}
          >
            Test
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Login;
