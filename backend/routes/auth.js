//package imports
const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();

//custom imports
const config = require("../config");
const User = require("../models/User");
const Employer = require("../models/Company");
const authController = require("../controllers/auth");

// POST => /auth/sinup/otp
router.post("/signup/otp", authController.otpVerification);

// POST => /auth/signup
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("user already exists");
          }
        });
      })
      .custom((value, { req }) => {
        return Employer.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("employer already exists");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().notEmpty(),
  ],
  authController.signup
);

// POST => /auth/login
router.post(
  "/login/:userType",
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.login
);

module.exports = router;
