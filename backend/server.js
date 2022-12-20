const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");

const apiRoutes = require("./routes/api-routes.js");
const authRoutes = require("./routes/auth-routes.js");
const HttpError = require("./models/http-error.js");

require("./controllers/auth-controller.js");

const app = express();

app.use(bodyParser.json());

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRoutes);

app.use("/auth", authRoutes);

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    // passport exposes a logout function on req
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// handles any request that doesn't match our routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// error handling middle ware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(process.env.PORT || 5000);
