const express = require("express");
const { body, check } = require("express-validator/check");

const router = express.Router();
const isAuth = require("../middleware/is-auth");

const internship = require("../controllers/internship");
const User = require("../models/User");

// GET => /internship/getinternships?query=value
router.get("/getinternships", internship.getInternships);

// POST => /internship/addInternship
router.post(
  "/addInternship",
  [
    check("vacancy").isNumeric(),
    check("skillsReq").isString(),
    check("title").isString(),
    check("description").trim().isString(),
    check("stipend").isString(),
    check("internshipPeriod").isString(),
    check("companyName").isString(),
    check("internshipType").isString(),
    check("applyBy").isString(),
    check("startDate").isString(),
  ],

  internship.addInternships
);

// GET => /internship/view/allinternships
router.get("/view/allinternships", internship.allinternships);

// GET => /internship/view/:internshipId
router.get("/view/:internshipId", internship.viewinternship);

// POST => /internship/apply
router.post("/apply", isAuth, internship.applyinternship);

router.get("/resume/:userId", internship.viewresume);
router.get("/search");
router.post("/updateInternship", internship.updateInternship);
router.post("/deleteInternship", internship.deleteInternship);
router.post("/rateInternship", internship.rateInternship);
router.post("/bookmark", internship.bookmarkInternship);
router.post("/deletebookmark", internship.deleteBookmarks);
router.post("/getbookmarks", internship.getbookmarks);

module.exports = router;
