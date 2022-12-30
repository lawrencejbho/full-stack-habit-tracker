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

        <div className="tw-flex tw-font-Poppins tw-items-center tw-justify-center">
          <Link to="/productivity/habit">
            <Button>Access Test Environment without Logging In</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
