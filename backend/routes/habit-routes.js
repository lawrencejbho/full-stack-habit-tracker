const express = require("express");

const apiHabitController = require("../controllers/api-habit-controller");

const router = express.Router();

// from the pid, we can return the pid entry
// router.get("/:pid", habitController.getPlaceById);

// router.get("/user/:uid", apiHabitController.getPlaceByUid);

// router.get("/habit-get", apiHabitController.getHabit);

router.post("/habit-create", apiHabitController.createHabit);

// router.post("/habit-update", apiHabitController.updateHabit);

// router.post("/habit-delete", apiHabitController.deleteHabit);

module.exports = router;
