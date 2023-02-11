const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/get-session-id", (req, res) => {
  // console.log("req.session" + req.session);
  if (req.session.passport !== undefined) {
    res.json(req.session.passport.user);
  } else {
    res.json("63a35a5f5a16d796fcb8f326");
  }
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
