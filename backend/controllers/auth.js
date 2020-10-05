//package imports
const jwt = require("jsonwebtoken");
const bcryct = require("bcryptjs");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator/check");

//custom imports
const config = require("../config");
const Student = require("../models/User");
const Employer = require("../models/Company");
const Otp = require("../models/otp");
const templates = require("../templates");

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

  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const userType = req.body.userType;

  let UserType;
  if (userType == "student") {
    UserType = Student;
  } else {
    UserType = Employer;
  }

  bcryct
    .hash(password, 12)
    .then((hashedpassword) => {
      // saving user in the database
      const user = new UserType({
        name: name,
        email: email,
        password: hashedpassword,
        isVerified: "false",
      });
      user.save();

      //generating otp, saving it in database and sending email
      const userOtp = saveAndSendOtp(email, userType);

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
  const userType = req.params.userType;

  let UserType;
  if (userType == "student") {
    UserType = Student;
  } else {
    UserType = Employer;
  }

  UserType.findOne({ email: email })
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
        const otp = saveAndSendOtp(email, userType);
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
  console.log(recievedId);
  Otp.findById(recievedId)
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

      let userType = data.userType;
      let UserType;
      if (userType == "student") {
        UserType = Student;
      } else {
        UserType = Employer;
      }

      // check if entered otp is valid
      if (data.otp == recievedOtp) {
        //verify the user
        UserType.findOne({ email: data.email }).then((user) => {
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
            userType: userType,
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
function saveAndSendOtp(email, userType) {
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
    userType: userType,
  });
  userOtp.save();

  console.log(email);
  console.log("otp=" + userOtp.otp);

  // sending otp to user via email
  console.log(templates.otpTemplate);
  //   transporter
  //     .sendMail({
  //       to: email,
  //       from: "naman1913128@akgec.ac.in",
  //       subject: "Verification OTP for InternBazaar",
  //       html: `<table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"bgcolor="#f0f0f0">
  //       <tr>
  //       <td style="padding: 30px 30px 20px 30px;">
  //           <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
  //           <tr>
  //               <td colspan="2" align="center" style="background-color: #333; padding: 40px;">
  //                 <p style="color:white; font-size:40px;">Otp For Verification</p>
  // <!--                     <a href="http://wso2.com/" target="_blank"><img src="http://cdn.wso2.com/wso2/newsletter/images/nl-2017/wso2-logo-transparent.png" border="0" /></a> -->
  //               </td>
  //           </tr>
  //           <tr>
  // <!--                 <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
  //                   <h1 style="padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;">
  //                       Internbazaar
  //                   </h1>
  //               </td> -->
  //           </tr>
  //           <tr>
  //               <td style="text-align: left; padding: 0px 50px;" valign="top">
  // <!--                     <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
  //                       Hi {{user.claims.givenname}},
  //                   </p> -->
  //                 <br>
  //                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
  //                       Please use this one time password ${otp} to verify your account.
  //                   </p>
  //               </td>
  //           </tr>
  //           <tr>
  //               <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
  //                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
  //                       Thanks,<br/>InternBazaar Team
  //                   </p>
  //               </td>
  //           </tr>
  //           <tr>
  //               <td colspan="2" align="center" style="padding: 20px 40px 40px 40px;" bgcolor="#f0f0f0">
  //                   <p style="font-size: 12px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #777;">
  //                       &copy; 2020
  //                       <a href="http://localhost:3000/" target="_blank" style="color: #777; text-decoration: none">InternBazaar</a>
  //                       <br>
  //                       AKGEC, Ghaziabad
  //                   </p>
  //               </td>
  //           </tr>
  //           </table>
  //       </td>
  //   </tr>
  // </table>`,
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  return userOtp;
}

exports.verifyToken = (req, res, next) => {
  return res.status(200).json({
    message: "token verified",
  });
};

exports.resendOtp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const userType = req.body.userType;

  //generating otp, saving it in database and sending email
  const userOtp = saveAndSendOtp(email, userType);

  //sending response to frontend
  res.status(200).json({
    message: "otp sent",
    email: email,
    id: userOtp._id,
  });
};

exports.resetPassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const userId = req.body.userId;
  const userType = req.body.userType;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  // checking if new passwords match
  if (newPassword != confirmPassword) {
    const error = new Error("Password reset failed");
    error.statusCode = 422;
    error.data = {
      msg: "Confirm passwords do not match",
      param: "confirmPassword",
    };
    throw error;
  }

  let UserType;
  if (userType == "student") {
    UserType = Student;
  } else {
    UserType = Employer;
  }

  let loadedUser;
  UserType.findById(userId)
    .then((user) => {
      //if user does not exist
      if (!user) {
        const error = new Error("Password reset failed");
        error.statusCode = 422;
        error.data = {
          value: email,
          msg: "User not found ",
          param: "userId",
          value: userId,
          location: "password reset",
        };
        throw error;
      }

      loadedUser = user;
      return bcryct.compare(oldPassword, user.password);
    })
    .then((match) => {
      // if old password does not match the one in the database
      if (!match) {
        const error = new Error("Password reset failed");
        error.statusCode = 401;
        error.data = {
          msg: "password incorrect",
          param: "oldPassword",
          location: "password reset",
        };
        throw error;
      }

      //hashing the new password
      return bcryct.hash(newPassword, 12);
    })
    .then((hashedpassword) => {
      loadedUser.password = hashedpassword;
      return loadedUser.save();
    })
    .then((user) => {
      return res.status(200).json({
        message: "password updated",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.forgotPassword = (req, res, next) => {
  const email = req.body.email;
};
