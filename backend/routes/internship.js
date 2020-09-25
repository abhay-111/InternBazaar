const express = require("express");
const router = express.Router();

const Users = require("../controllers/internship");

// GET => /internships/:internshipType
router.get("/:internshipType", Users.getInternships);

// POST => /internships
router.post("/", Users.addInternships);

module.exports = router;