const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const subscribeValidation = require("../middlewares/subscribeValidation");

router.post("/", subscribeValidation, UserController.createOne);
router.put("/:id", subscribeValidation, UserController.updateOne);
router.delete("/:id", UserController.deleteOne);

module.exports = router;
