const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:uid", userController.getUser);
router.get("/", userController.getAll)

module.exports = router;