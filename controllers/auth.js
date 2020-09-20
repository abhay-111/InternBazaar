const User = require("../models/User");
const bcryct = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator/check");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

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
      if (result) {
        return res.status(401).json({
          message: "user exists",
        });
      }
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
              from: "abhay1912052@akgec.ac.in",
              subject: "Sign up OTP",
              html: `<h1>OTP: ${Otp} </h1>`,
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(collegeName);
          res.status(200).json({
            message: "User added",
            email: email,
            collegeName: collegeName,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 401;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(403).json({
        message: "user not found",
      });
    }
    bcryct.compare(password, user.password).then((match) => {
      console.log(match);
      if (match) {
        return res.status(200).json({
          message: "password correct",
        });
      } else {
        return res.status(401).json({
          message: "password incorrect",
        });
      }
    });
  });
};
