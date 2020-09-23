const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
});

module.exports = mongoose.model("User", userschema);
