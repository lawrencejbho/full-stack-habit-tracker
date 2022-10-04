const HttpError = require("../models/http-error");

const getAll = (req, res, next) => {
  //   let placeId = req.params.pid;
  //   const place = testData.find((data) => {
  //     return data.pid === placeId;
  //   });
  //   if (!place) {
  //     throw new HttpError("Could not find the pid", 404);
  //   }
  //   res.json(place);
};

exports.getAll = getAll;
