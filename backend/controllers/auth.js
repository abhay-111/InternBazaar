//package imports
const jwt = require("jsonwebtoken");
const bcryct = require("bcryptjs");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator/check");
const Company=require('../models/Company')

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
    return req.status(422).json({
      data: errors.array(),
      msg: "validation failed",
    });
  }

  const collegeName = req.body.collegeName;
  const password = req.body.password;
  const email = req.body.email;
  const userType=req.body.userType;


  if(userType==="User")
  {
    
      bcryct
      .hash(password, 12)
      .then((hashedpassword) => {
        // saving user in the database
        const user = new User({
          email: email,
          collegeName: collegeName,
          password: hashedpassword,
          isVerified: "false",
        });
        user.save();

        //generating otp, saving it in database and sending email
        const userOtp = saveAndSendOtp(email);

        //sending response to frontend
        res.status(200).json({
          message: "otp sent",
          email: email,
          id: userOtp._id,
        });
      })
      .catch((err) => {
        console.log(err);
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });


  }
  if(userType==="Employer")
  {
    
  bcryct
  .hash(password, 12)
  .then((hashedpassword) => {
    // saving user in the database
    const company = new Company({
      email: email,
      collegeName: collegeName,
      password: hashedpassword,
      isVerified: "false",
    });
    company.save();

    //generating otp, saving it in database and sending email
    const userOtp = saveAndSendOtp(email);

    //sending response to frontend
    res.status(200).json({
      message: "otp sent",
      email: email,
      id: userOtp._id,
    });
  })
  .catch((err) => {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });

  }



  
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
  console.log(password);

  User.findOne({ email: email })
    .then((user) => {
      //if user does not exist
      if (!user) {
        const error = new Error("Login Failed");
        error.statusCode = 422;
        error.data = {
          value: email,
          msg: "User not found ",
          param: "email",
          location: "login",
        };
        throw error;
      }

      //if user is not verfied
      if (user.isVerified == "false") {
        const otp = saveAndSendOtp(email);
        const error = new Error("Login failed, user not verified");
        error.statusCode = 403;
        error.data = {
          msg: "otp sent please verify yourself",
          location: "login",
          id: otp._id,
        };
        throw error;
      }

      bcryct
        .compare(password, user.password)
        .then((match) => {
          // if passwords do not match
          if (!match) {
            const error = new Error("Login Failed");
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
              data: {
                id: undefined,
              },
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
  const recievedId = req.body.id;
  const recievedOtp = req.body.otp;
  // searching for otp in database by token
  Otp.findOne({ _id: recievedId })
    .then((data) => {
      // if id is invalid/not found
      if (!data) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = {
          value: recievedOtp,
          msg: "invalid id",
          param: "otp",
          location: "otp",
        };
        throw error;
      }

      // check if entered otp is valid
      if (data.otp == recievedOtp) {
        //verify the user
        User.findOne({ email: data.email }).then((user) => {
          user.isVerified = "true";
          user.save();

          //removing otp from database
          data.remove();

          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id.toString(),
              loggedIn: "true",
            },
            "internbazaarsecret",
            { expiresIn: "1h" }
          );

          return res.status(200).json({
            message: "password correct, user added",
            token: token,
            userId: user._id.toString(),
          });
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

// this function generates, saves and sends the otp to the user
function saveAndSendOtp(email) {
  //generate otp
  let otp = otpGenerator.generate(6, {
    alphabets: false,
    specialChars: false,
    upperCase: false,
  });

  //saving the otp in database
  const userOtp = new Otp({
    otp: otp,
    email: email,
  });
  userOtp.save();

  console.log(email);
  console.log("otp=" + userOtp.otp);

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

  return userOtp;
}
