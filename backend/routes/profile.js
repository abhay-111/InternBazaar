const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profile");

// POST => /profile/edit
router.post("/edit", profileController.updateResume);

// GET => /profile/view
router.post("/view", profileController.viewResume);

module.exports = router;
