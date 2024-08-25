const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller.js");

router.post("/", controller.create);
router.get("/tenant/:tenantId", controller.findAllByTenant);

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.post("/auth", controller.auth);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.put("/:id/restore", controller.restore);

module.exports = router;