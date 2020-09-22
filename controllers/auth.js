const User = require("../models/User");
const bcryct = require("bcryptjs");
const nodemailer = require("nodemailer");
const config=require("../config")
const otpGenerator=require('otp-generator')

var api_key = 'dfdb0bae64f929b1b1b8b92b7965dd7c-cb3791c4-31fb3caa';
var domain = 'sandboxc0445d89b6074e87851458b1991b5287.mailgun.org';
 
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator/check");


const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:config.apikey,
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
     
      bcryct
        .hash(password, 12)
        .then((hashedpassword) => {
          const user = new User({
            email: email,
            collegeName: collegeName,
            password: hashedpassword,
          });
          user.save();
          // let Otp = Math.floor(100000 + Math.random() * 900000);
          // transporter
          //   .sendMail({
          //     to: 'abhaychauhan232@gmail.com',
          //     from: "abhay1912052@akgec.ac.in",
          //     subject: "Sign up OTP",
          //     html: `<h1>OTP: ${Otp} </h1>`,
          //   })
          //   console.log(transporter.MailMessage)
          //   .catch((err) => {
          //     console.log(err);
          //   })

          const otp=otpGenerator.generate(6,{specialChars:false})
            var data = {
              from: 'Abhay <abhaychauhan232@gmail.com>',
              to: 'abhaychauhan232@gmail.com',
              
              subject: 'Sign Up succesfull!!',
              
              text: 'Here is your One time Password. It will expire in the next 15 minutes   '+otp+'',
              text:'s'
              
            };
             
            mailgun.messages().send(data, function (error, body) {
              console.log(body);
            });
 
            
          console.log(collegeName);
          res.status(200).json({
            message: "User added",
            email: email,
            collegeName: collegeName,
          });
        }).catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    }).catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 422;
    error.data = error.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("Validation Failed");
        error.statusCode = 401;
        error.data={
          value:email,
          msg:'User not found ',
          param:'email',
          location:'login'
        }

        throw error;
      }
      bcryct.compare(password, user.password).then((match) => {
        // console.log(match);
        if (!match) {
          const error = new Error("Validation Failed");
          
          error.data={
            value:null,
            msg:'Password Incorrect ',
            param:'password',
            location:'login'
          }
          error.statusCode = 401;
          throw error;
          // return res.status(401).json({
          //   message: "password incorrect",
          // });
        } else {
          return res.status(200).json({
            message: "password correct",
          });
        }
      }).catch((err) => {
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
