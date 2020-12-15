const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.get("/", UserController.getAll);
router.get("/find", UserController.findAllBy);
router.get("/:id", UserController.getOne);
router.get("/building/:building_id", UserController.getAllInBuilding);
router.get("/withbuilding/:id", UserController.getOneWithBuilding);
router.put("/:id", UserController.updateOne);

module.exports = router;
