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
      <div className="tw-font-Poppins">
        <div className="tw-container tw-mt-4 tw-flex tw-items-start sm:tw-mt-12 ">
          <div className="tw-py-3">
            <img src={Mango} className="tw-w-12" />
          </div>
          <h1 className="tw-text-bookmark-blue tw-px-1">HaTr</h1>
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
