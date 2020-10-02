const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profile");

// POST => /profile/edit
router.post("/edit", profileController.updateResume);

// GET => /profile/view
router.post("/view", profileController.viewResume);

router.post("/myapplications", profileController.myapplications);
router.post("/applieduser", profileController.appliedusers);

// POST => /profile/postedInternships
router.post("/postedInternships", profileController.viewPostedInternships);

router.post("/changeStatus", profileController.changeStatus);

module.exports = router;
