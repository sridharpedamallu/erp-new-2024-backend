const express = require("express");
const router = express.Router();

const controller = require("../controllers/city.controller.js");

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/country/:countryId", controller.findAllByCountry);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.put("/:id/restore", controller.restore);

module.exports = router;