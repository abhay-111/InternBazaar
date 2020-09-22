const express = require("express");
const Users = require("../controllers/internship");
const router = express.Router();

router.get("/internships/:internshipType", Users.getInternships);
router.post("/internships", Users.addInternships);
// router.get('/internship/:internshipType')

module.exports = router;
