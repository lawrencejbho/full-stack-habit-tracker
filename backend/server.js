const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const apiRoutes = require("./routes/api-routes.js");
const authRoutes = require("./routes/auth-routes.js");
const HttpError = require("./models/http-error.js");

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "Testing.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/test", (req, res) => {
  console.log(req.body);
  // res.status(error.code || 504);
  res.send("thank you");
});

// api routes for React to query
app.use("/api", apiRoutes);

app.use("/auth", authRoutes);

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
