const express = require("express");

const authController = require("../controllers/auth-controller");

const router = express.Router();

router.get("/google", authController.googleLogin);

router.get("/test", (req, res) => {
  res.send(200);
});

module.exports = router;
