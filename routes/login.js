const login = require("../controllers/login");
const express = require("express");
const router = express.Router();

router.post("/signup", login.signup);

module.exports = router;
