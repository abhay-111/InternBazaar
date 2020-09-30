const { body } = require("express-validator");
const User = require("../models/User");

exports.updateProfile = (req, res, next) => {
  const id = req.body.id;
  const data = req.body.data;

  for (const key in data) {
    if (Array.isArray(data[key])) {
      User.findByIdAndUpdate(id, { $push: { [key]: data[key] } })
        .then(console.log("done"))
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    } else {
      User.findById(id)
        .then((user) => {
          user.set(key, data[key]);
          user.save();
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    }
  }
  res.status(200).json({
    message: "updated user",
  });
};

exports.viewProfile = (req, res, next) => {
  const userID = req.params.userId;
  User.findById(userID)
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

exports.myapplications = (req, res, next) => {
  const userId = req.body.userId;
  User.findById(userId)
    .then((data) => {
      const applications = data.applications;
      res.status(200).json({
        message: "All applications Fetched",
        data: applications,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
