const Auth = require("../controllers/auth");
const express = require("express");
const { body } = require("express-validator/check");
const User = require("../models/User");

const router = express.Router();

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
  Auth.signup
);

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
  Auth.login
);

module.exports = router;
