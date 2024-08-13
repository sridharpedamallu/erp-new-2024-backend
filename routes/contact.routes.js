const express = require("express");
const router = express.Router();

const controller = require("../controllers/contact.controller.js");
router.post("/:companyId", controller.create);
router.get("/:companyId", controller.findAll);
router.get("/:companyId/contact/:id", controller.findAll);
router.put("/:companyId/contact/:id", controller.update);
router.delete("/:companyId/contact/:id", controller.delete);
router.put("/:companyId/contact/:id/restore", controller.restore);

module.exports = router;