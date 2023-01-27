import React from "react";
import {
  GoogleLoginButton,
  GithubLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import Habby from "../images/habby.svg";

function Login() {
  return (
    <>
      <div className="tw-font-Poppins">
        <div className="tw-container tw-mt-4 tw-flex tw-items-center sm:tw-mt-12 ">
          <div className="tw-py-3">
            <img src={Habby} className="tw-w-32" />
          </div>
        </div>
      </div>
      <div className="access-container tw-mt-10">
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
