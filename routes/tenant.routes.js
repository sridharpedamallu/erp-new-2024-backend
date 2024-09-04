const express = require("express");
const router = express.Router();
const controller = require("../controllers/tenant.controller.js");


router.get("/", controller.findAll);
router.post("/", controller.create);
router.get("/login-settings/:id", controller.getLoginSettings);
router.post("/login-settings/:id", controller.setLoginSettings);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.put("/:id/restore", controller.restore);

module.exports = router;