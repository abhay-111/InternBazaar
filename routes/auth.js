//package imports
const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();

//custom imports
const config = require("../config");
const User = require("../models/User");
const authController = require("../controllers/auth");

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
            return Promise.reject("email already exist");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
    body("collegeName").trim().not().notEmpty(),
  ],
  authController.signup
);

// POST => /auth/login
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("user does not exist");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.login
);

module.exports = router;
