const HttpError = require("../models/http-error");

const testData = [
  { id: "1", uid: "1", pid: "1" },
  { id: "5", uid: "5", pid: "5" },
];

const getPlaceById = (req, res, next) => {
  let placeId = req.params.pid;
  const place = testData.find((data) => {
    return data.pid === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find the pid", 404);
  }
  res.json(place);
};

const getPlaceByUid = (req, res, next) => {
  let userId = req.params.uid;
  let user = testData.find((data) => {
    return data.id === userId;
  });

  if (!user) {
    return next(new HttpError("Could not find the uid", 404));
  }
  res.json(user);
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUid = getPlaceByUid;
