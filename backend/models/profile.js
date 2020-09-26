const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const educationSchema = require("./education-profile");

// defining the schema model for User resgistration
const profileSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  //   password: {
  //     type: String,
  //     required: true,
  //   },
  collegeName: {
    type: String,
    required: true,
  },
  education: [educationSchema],
});

module.exports = mongoose.model("profile", profileSchema);
