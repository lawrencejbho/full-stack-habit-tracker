const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const habitRoutes = require("./routes/habit-routes.js");
const router = require("./routes/habit-routes.js");
// const otherRoutes = require("./routes/other-routes.js");
const apiRoutes = require("./routes/api-routes.js");

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/test", (req, res) => {
  console.log(req.body);
  // res.status(error.code || 504);
  res.send("thank you");
});

app.use("/habit", habitRoutes);
// app.use("/other", otherRoutes);
// app.use("/weather", weatherRoutes);

// react will query the api route
app.use("/api", apiRoutes);

// error handling middle ware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(5000);
