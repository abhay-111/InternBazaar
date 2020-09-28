const express = require("express");
const router = express.Router();

const User = require("../controllers/profile");

// GET => /internships/:internshipType
router.post("/", User.updateUser);

// POST => /internships
// router.post("/", Users.addInternships);

module.exports = router;
