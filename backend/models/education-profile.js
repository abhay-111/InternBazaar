const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for otp storage
const educationSchema = new Schema({
  collegeName: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  startYear: {
    type: Number,
  },
  endYear: {
    type: Number,
    required: true,
  },
  performanceScale: {
    type: String,
  },
  performance: {
    type: Decimal128,
  },
});

module.exports = educationSchema;
