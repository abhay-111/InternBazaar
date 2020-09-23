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

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: config.apikey,
    },
  })
);

// var mailgun = require("mailgun-js")({
//   apiKey: config.mailgunapikey,
//   domain: config.mailgundomain,
// });

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
          const user = new User({
            email: email,
            collegeName: collegeName,
            password: hashedpassword,
          });
          user.save();
          let Otp = Math.floor(100000 + Math.random() * 900000);
          transporter
            .sendMail({
              to: email,
              from: "naman1913128@akgec.ac.in",
              subject: "Sign up OTP",
              html: `<h1>OTP: ${Otp} </h1>`,
            })
            .catch((err) => {
              console.log(err);
            });
          // console.log(transporter.MailMessage).catch((err) => {
          //   console.log(err);
          // });

          // const otp = otpGenerator.generate(6, { specialChars: false });
          // var data = {
          //   from: "Abhay <abhaychauhan232@gmail.com>",
          //   to: "abhaychauhan232@gmail.com",

          //   subject: "Sign Up succesfull!!",

          //   text:
          //     "Here is your One time Password. It will expire in the next 15 minutes   " +
          //     otp +
          //     "",
          //   text: "s",
          // };

          // mailgun.messages().send(data, function (error, body) {
          //   console.log(body);
          // });

          console.log(collegeName);
          res.status(200).json({
            message: "User added",
            email: email,
            collegeName: collegeName,
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
        // error.data = {
        //   value: email,
        //   msg: "User not found ",
        //   param: "email",
        //   location: "login",
        // };
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
