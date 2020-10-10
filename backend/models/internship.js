const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for Internship listings
const InternshipSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  creatorId: {
    required: true,
    type: String,
  },
  applications: [
    {
      //TODO : CHANGE USERID TO USER
      userId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
      status: String,
    },
  ],

  startDate: {
    type: String,
    required: true,
  },
  applyBy: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  whocanApply: {
    type: String,
    required: true,
  },
  perks: {
    type: String,
    required: true,
  },

  stipend: {
    type: String,
    required: true,
  },
  internshipPeriod: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  internshipType: {
    type: String,
    required: true,
  },
  skillsReq: {
    type: String,
    required: true,
  },
  vacancy: {
    type: Number,
    required: true,
  },
  rating: {
    type: Array,
    default: [0],
  },
  avgrating: {
    type: Number,
    default: 0,
  },
  creatorImage: String,
  rater: [
    {
      raterId: {
        type: String,
      },
      ratevalue: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("Internship", InternshipSchema);
