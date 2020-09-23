const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for otp storage
const OtpSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Otp", OtpSchema);
