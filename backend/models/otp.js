const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for otp storage
const OtpSchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

module.exports = mongoose.model("Otp", OtpSchema);
