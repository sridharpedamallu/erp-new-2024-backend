const express = require("express");
const router = express.Router();

const controller = require("../controllers/contactaddress.controller.js");
router.post("/", controller.create);
router.get("/:contactId", controller.findAll);
router.get("/:contactId/address/:addressId", controller.findOne);
router.put("/:contactId/address/:addressId", controller.update);
router.delete("/:contactId/address/:addressId", controller.delete);
router.put("/:contactId/address/:addressId/restore", controller.restore);

module.exports = router;