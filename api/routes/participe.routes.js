const express = require("express");
const router = express.Router();
const ParticipeController = require("../controllers/participe.controller");

router.get("/", ParticipeController.getAll);
router.get("/event/:event_id", ParticipeController.getAllByEventsId);
router.post("/", ParticipeController.createOne);
router.delete("/", ParticipeController.deleteOne);
router.delete("/event/", ParticipeController.deleteAllByEventId);

module.exports = router;
