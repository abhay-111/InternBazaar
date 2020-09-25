const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for otp storage
const OtpSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
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
  },
  { timestamps: true }
);
OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

module.exports = mongoose.model("Otp", OtpSchema);
