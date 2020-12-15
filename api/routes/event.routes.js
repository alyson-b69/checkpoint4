const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event.controller");

router.get("/", EventController.getAll);
router.get("/:id", EventController.getById);
router.get("/building/:building_id", EventController.getAllByBuildingId);
router.post("/", EventController.createOne);
router.put("/:id", EventController.updateOne);
router.delete("/:id", EventController.deleteOne);

module.exports = router;
