const HttpError = require("../models/http-error");
const bodyParser = require("body-parser");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOATLAS, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const emailSchema = require("../models/emailSchema");
const EmailModel = mongoose.model("EmailModel", emailSchema);

const createEmailObject = (req, res) => {
  const email = new HabitModel({
    origin: "landing",
    email: [],
  });
  habit.save();
};

const addNewEmail = (req, res) => {
  console.log(req.body);
  const filter = { origin: "landing" };
  const update = { $push: { email: req.body.email } };
  HabitModel.findOneAndUpdate(filter, update)
    .then(() => {
      console.log("added user email address");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.createEmailObject = createEmailObject;
exports.addNewEmail = addNewEmail;
