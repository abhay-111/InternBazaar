//package imports
const jwt = require("jsonwebtoken");
const bcryct = require("bcryptjs");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator/check");

//custom imports
const config = require("../config");
const User = require("../models/User");
const Otp = require("../models/otp");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: config.apikey,
    },
  })
);

// signup / registering user
exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const collegeName = req.body.collegeName;
  const password = req.body.password;
  const email = req.body.email;

  User.findOne({ email: email })
    .then((result) => {
      bcryct
        .hash(password, 12)
        .then((hashedpassword) => {
          // saving user in the database

          //generating otp and token
          let otp = Math.floor(100000 + Math.random() * 900000);
          const token = jwt.sign(
            {
              email: email,
            },
            config.tokenkey,
            { expiresIn: 600 } //600s = 10min
          );

          //saving the otp in datavase
          const userOtp = new Otp({
            token: token,
            otp: otp,
            email: email,
            collegeName: collegeName,
            password: hashedpassword,
          });
          userOtp.save();
          console.log(email);
          console.log("otp=" + otp);

          //TODO REMOVE CONSOLE LOG AND UNCOMMENT MAILER CODE
          //sending otp to user via email
          // transporter
          //   .sendMail({
          //     to: email,
          //     from: "naman1913128@akgec.ac.in",
          //     subject: "Sign up OTP",
          //     html: `<h1>OTP: ${otp} </h1>`,
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });

          //sending response to frontend
          res.status(200).json({
            message: "otp sent",
            email: email,
            collegeName: collegeName,
            token: token,
          });
        })
        .catch((err) => {
          console.log(err);
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// login / authenticating user
exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      //if user does not exist
      if (!user) {
        const error = new Error("Validation Failed");
        error.statusCode = 401;
        error.data = {
          value: email,
          msg: "User not found ",
          param: "email",
          location: "login",
        };
        throw error;
      }
      bcryct
        .compare(password, user.password)
        .then((match) => {
          // if passwords do not match
          if (!match) {
            const error = new Error("Validation Failed");
            error.data = {
              value: null,
              msg: "Password Incorrect ",
              param: "password",
              location: "login",
            };
            error.statusCode = 401;
            throw error;
          } else {
            //if passwords match sending a token
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id.toString(),
              },
              "internbazaarsecret",
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              message: "password correct",
              token: token,
              userId: user._id.toString(),
            });
          }
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.otpVerification = (req, res, next) => {
  const recievedToken = req.body.token;
  const recievedOtp = req.body.otp;
  // searching for otp in database by token
  Otp.findOne({ token: recievedToken })
    .then((data) => {
      // if token is invalid/not found
      if (!data) {
        const error = new Error("Validation failed");
        error.statusCode = 403;
        error.data = {
          value: recievedOtp,
          msg: "invalid token",
          param: "otp",
          location: "otp",
        };
        throw error;
      }

      // check if entered otp is valid
      if (data.otp == recievedOtp) {
        // creating new user to be stored in database
        const email = data.email;
        const collegeName = data.collegeName;
        const password = data.password;
        const user = new User({
          email: email,
          collegeName: collegeName,
          password: password,
        });
        user.save();

        //removing otp from database
        data.remove();

        return res.status(200).json({
          message: "password correct, user added",
        });
      } else {
        const error = new Error("Validation Failed");
        error.statusCode = 401;
        error.data = {
          value: recievedOtp,
          msg: "Otp incorrect",
          param: "otp",
          location: "otp",
        };
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
