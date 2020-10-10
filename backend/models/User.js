const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const { ref } = require("pdfkit");

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
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: String,
    require: true,
  },
  about: String,
  education: String,
  phone: String,
  location: String,
  skills: String,
  links: String,
  jobs: String,
  additional: String,
  bookmark: [
    {
      internshipId: String,
      title: String,
    },
  ],
  resumecreated: {
    type: Boolean,
    default: false,
  },

  resume: {
    type: String,
  },
  applications: [
    {
      internshipId: {
        type: Schema.Types.ObjectId,
        ref: "Internship",
      },
      status: String,
      companyName: String,
      internshipProfile: String,
    },
  ],
});

module.exports = mongoose.model("Student", userschema);
