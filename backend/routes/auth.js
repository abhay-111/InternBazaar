//package imports
const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();

//custom imports
const config = require("../config");
const User = require("../models/User");
const Employer = require("../models/Company");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const isAuthReset = require("../middleware/is-auth-reset");

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
    body("password").trim().isLength({ min: 6 }),
    body("name").trim().not().notEmpty(),
  ],
  authController.signup
);

// POST => /auth/login/userType
router.post(
  "/login/:userType",
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
  ],
  authController.login
);

// POST => /auth/verifytoken
router.post("/verifytoken", isAuth, authController.verifyToken);

// POST => /auth/resendOtp
router.post(
  "/resendOtp",
  [body("email").isEmail().withMessage("Invalid email").normalizeEmail()],
  authController.resendOtp
);

// POST => /auth/resetPassword
router.post(
  "/resetPassword",
  [
    body("oldPassword").trim().isLength({ min: 6 }),
    body("newPassword").trim().isLength({ min: 6 }),
    body("confirmPassword").trim().isLength({ min: 6 }),
  ],
  authController.resetPassword
);

// POST => /auth/forgotPassword
router.post(
  "/forgotPassword",
  [body("email").isEmail().withMessage("Invalid email").normalizeEmail()],
  authController.forgotPassword
);

router.post("/forgotReset", isAuthReset, authController.forgotPasswordUpdate);

router.use(
  "/verifytokenLink/:token",
  isAuthReset,
  authController.verifyTokenLink
);

module.exports = router;
