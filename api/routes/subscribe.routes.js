const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const subscribeValidation = require("../middlewares/subscribeValidation");
const updateValidation = require("../middlewares/updateValidation");

router.post("/", subscribeValidation, UserController.createOne);
router.put("/:id", updateValidation, UserController.updateOne);
router.delete("/:id", UserController.deleteOne);

module.exports = router;
