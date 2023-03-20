import React from "react";
import {
  GoogleLoginButton,
  GithubLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import Logo from "../images/logo.svg";

function Login() {
  return (
    <div className="tw-bg-[#f4ede3] tw-h-screen tw-w-screen tw-inline-block">
      <div className="tw-font-Poppins">
        <div className="tw-container tw-mt-4 tw-flex tw-items-center sm:tw-mt-8 ">
          <div className="tw-pt-2">
            <img src={Logo} className="tw-w-20" />
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
    </div>
  );
}

export default Login;
