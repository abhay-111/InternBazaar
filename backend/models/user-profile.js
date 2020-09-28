const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// education object
const education = {
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
};

// defining the schema model for User resgistration
const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  education: [education],
  phone: String,
  location: [String],
  skills: [String],
  links: [String],
});

module.exports = mongoose.model("UserProfile", profileSchema);
