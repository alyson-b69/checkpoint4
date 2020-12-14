const express = require("express");
const router = express.Router();
const BuildingController = require("../controllers/building.controller");

router.get("/", BuildingController.getAll);
router.get("/:id", BuildingController.getById);
router.get("/zip/:zip_code", BuildingController.getAllByZip);
router.post("/", BuildingController.createOne);
router.put("/:id", BuildingController.updateOne);
router.put("/:id", BuildingController.deleteOne);

module.exports = router;
