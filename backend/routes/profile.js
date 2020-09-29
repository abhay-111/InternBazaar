const express = require("express");
const router = express.Router();

const User = require("../controllers/profile");

// POST => /profile/add
router.post("/add", User.updateProfile);

// GET => /profile/view/userID
router.get("/view/:userId", User.viewProfile);

module.exports = router;
