const express = require("express");

const bodyParser = require("body-parser");

const habitRoutes = require("./routes/habit-routes.js");
const otherRoutes = require("./routes/habit-routes.js");

const app = express();

app.use("/habit", habitRoutes);
app.use("/other", otherRoutes);

// error handling middle ware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(5000);
