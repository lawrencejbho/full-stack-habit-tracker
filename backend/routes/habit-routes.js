const express = require("express");
const { appendFile } = require("fs");

const HttpError = require("../models/http-error");

const router = express.Router();

const testData = [
  { id: "1", uid: "1", pid: "1" },
  { id: "5", uid: "5", pid: "5" },
];

// from the pid, we can return the pid entry
router.get("/:pid", (req, res, next) => {
  let placeId = req.params.pid;
  const place = testData.find((data) => {
    return data.pid === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find the pid", 404);
  }
  res.json(place);
});

router.get("/user/:uid", (req, res, next) => {
  let userId = req.params.uid;
  let user = testData.find((data) => {
    return data.id === userId;
  });

  if (!user) {
    return next(new HttpError("Could not find the uid", 404));
  }
  res.json(user);
});

module.exports = router;
