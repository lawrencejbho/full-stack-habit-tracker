const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/get-session-id", (req, res) => {
  console.log(req.session);
  res.json(req.session.passport.user);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/productivity/analytics",
  }),
  function (req, res) {
    // Successful authentication
    res.redirect("/productivity/habit");
  }
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/productivity/analytics",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/productivity/habit");
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/productivity/analytics",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/productivity/habit");
  }
);

module.exports = router;
