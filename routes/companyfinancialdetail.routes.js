const express = require("express");
const router = express.Router();

const controller = require("../controllers/companyfinancialdetail.controller.js");
router.post("/", controller.create);
router.get("/company/:companyId", controller.findAll);
router.get("/company/:companyId/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.put("/:id/restore", controller.restore);

module.exports = router;