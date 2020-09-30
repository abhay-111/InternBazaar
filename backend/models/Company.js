const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for User resgistration
const companyschema = new Schema({
  name: {
    type: String,
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
  isVerified: {
    type: String,
    require: true,
  },
  collegeName: String,
  website: String,
  established: String,
  about: String,
  phone: String,
  address: String,
  location: String,
  links: String,
  internshipsPosted: [Schema.Types.ObjectId],
});

module.exports = mongoose.model("Employer", companyschema);
