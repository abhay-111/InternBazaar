const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// education object
const education = {
  collegeName: {
    type: String,
    // required: true,
  },
  degree: {
    type: String,
    // required: true,
  },
  startYear: {
    type: Number,
  },
  endYear: {
    type: Number,
    // required: true,
  },
  performanceScale: {
    type: String,
  },
  performance: {
    type: Decimal128,
  },
};

// defining the schema model for User resgistration
const userschema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  isVerified: {
    type: String,
    require: true,
  },
  education: [education],
  phone: {
    type: String,
  },
  location: [String],
  skills: [String],
  links: [String],
  applications: [
    {
      internshipId: String,
      status: String,
      noofapplicants: Number,
      companyName: String,
    },
  ],
});

module.exports = mongoose.model("User", userschema);
