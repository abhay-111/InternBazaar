const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profile");

// POST => /profile/edit/?userType=UserType
router.post("/edit", profileController.updateProfile);

// GET => /profile/view/userID/?userType=UserType
router.get("/view/:userId", profileController.viewProfile);

module.exports = router;
