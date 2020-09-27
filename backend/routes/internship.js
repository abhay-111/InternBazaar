const express = require("express");
const { body, check } = require("express-validator/check");

const router = express.Router();

const Users = require("../controllers/internship");

// GET => /internships/:internshipType
router.get("/internships",Users.getInternships);

// POST => /internships
router.post("/add",[

    check('vacancy').isNumeric(),
    check('skillsReq').isString(),
    check('title').isString(),
    check('description').isString(),
    check('stipend').isString(),
    check('internshipPeriod').isString(),
    check('companyName').isString(),
    check('internshipType').isString(),
    check('applyBy').isString(),
    check('startDate').isString()





], Users.addInternships);

module.exports = router;
