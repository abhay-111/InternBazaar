const { body } = require("express-validator");
const User = require("../models/User");

exports.updateUser = (req, res, next) => {
  const id = req.body.id;
  const data = req.body.data;
  User.findById(id)
    .then((user) => {
      console.log(user);
      for (const key in data) {
        console.log("key=" + key + " data=" + data[key]);
        user.key = data[key];
        console.log(user);
        // if (data.hasOwnProperty(key)) {
        // }
      }
      user.isVerfied = "false";
      user.save();
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
