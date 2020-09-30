const { body } = require("express-validator");
const Student = require("../models/User");
const Employer = require("../models/Company");

exports.updateResume = (req, res, next) => {
  const id = req.body.userId;
  const data = req.body.data;
  const userType = req.body.userType;

  // const tokenUserId = req.id;
  // if (tokenUserId != id) {
  //   const error = new Error("Update request failed, token unverified");
  //   error.statusCode = 401;
  //   error.data = {
  //     msg: "user not authorized, token not verified",
  //     param: "userId",
  //     value: id,
  //     location: "updateProfile",
  //   };
  //   throw error;
  // }

  let UserType;
  if (userType == "student") {
    UserType = Student;
  } else {
    UserType = Employer;
  }

  UserType.findById(id)
    .then((user) => {
      if (!user) {
        const error = new Error("Update request failed");
        error.statusCode = 422;
        error.data = {
          msg: "user not found",
          param: "userId",
          value: id,
          location: "updateProfile",
        };
        throw error;
      }

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] != null) user.set(key, data[key]);
        }
      }
      return user.save();
    })
    .then((user) => {
      console.log(user);
      res.status(200).json({
        message: "updated user",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
// for (const key in data) {
//   if (Array.isArray(data[key])) {
//     User.findByIdAndUpdate(id, { $push: { [key]: data[key] } })
//       .then(console.log("done"))
//       .catch((err) => {
//         if (!err.statusCode) {
//           err.statusCode = 500;
//         }
//         next(err);
//       });
//   } else {
//     User.findById(id)
//       .then((user) => {
//         user.set(key, data[key]);
//         user.save();
//       })
//       .catch((err) => {
//         if (!err.statusCode) {
//           err.statusCode = 500;
//         }
//         next(err);
//       });
//   }
// }
// res.status(200).json({
//   message: "updated user",
// });
// };

exports.viewResume = (req, res, next) => {
  const userID = req.body.userId;
  const userType = req.body.userType;

  let UserType;
  if (userType == "student") {
    UserType = Student;
  } else {
    UserType = Employer;
  }

  UserType.findById(userID)
    .then((user) => {
      if (!user) {
        const error = new Error("Invalid user id");
        error.statusCode = 422;
        error.data = {
          location: "profile",
          msg: "user does not exist",
          param: "userId",
          value: userID,
        };
        throw error;
      }
      res.status(200).json({
        message: "user found",
        user: user,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.viewApplications = (req, res, next) => {
//   const userID = req.userID;

//   User.findById(userID);
// }
