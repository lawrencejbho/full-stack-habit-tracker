// const express = require("express");
// const mongoose = require("mongoose");
// const passport = require("passport");
// const session = require("express-session");

// const app = express();

// const router = express.Router();

// const googleLogin = (req, res) => {
//   console.log("Hit");
//   passport.authenticate("google", { scope: ["profile"] });
// };

// const googleCallBack = (req, res) => {
//   console.log("hitt");
//   passport.authenticate("google", { failureRedirect: "/home" }),
//     function (req, res) {
//       // Successful authentication, redirect home.
//       res.redirect("/api/productivity/habit");
//     };
// };

// exports.googleLogin = googleLogin;
// exports.googleCallBack = googleCallBack;
