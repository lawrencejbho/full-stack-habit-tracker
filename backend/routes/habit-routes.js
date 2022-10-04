const express = require("express");

const habitController = require("../controllers/habit-controller");

const router = express.Router();

// from the pid, we can return the pid entry
router.get("/:pid", habitController.getPlaceById);

router.get("/user/:uid", habitController.getPlaceByUid);

module.exports = router;
