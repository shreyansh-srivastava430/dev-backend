const express = require("express");
const router = express.Router();
const { signup, login,simple } = require("../controller/authController");

router.post("/signup",signup);
router.post("/login",login);
router.get('/simple', simple);
module.exports = router;
