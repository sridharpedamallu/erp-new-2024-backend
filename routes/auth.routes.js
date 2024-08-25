const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller.js");

router.post("/", controller.login);
router.post("/generate-otp", controller.generateOTP);
router.post("/verify-otp", controller.verifyOTP);

module.exports = router;