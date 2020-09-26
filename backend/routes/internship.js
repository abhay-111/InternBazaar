const express = require("express");
const router = express.Router();

const Users = require("../controllers/internship");

// GET => /internships/:internshipType
router.get("/internships", Users.getInternships);

// POST => /internships
router.post("/add", Users.addInternships);

module.exports = router;
