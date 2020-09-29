const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for User resgistration
const companyschema = new Schema({
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
});

module.exports = mongoose.model("Company", companyschema);
