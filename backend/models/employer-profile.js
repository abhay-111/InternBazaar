const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for company resgistration
const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: String,
  established: String,
  about: String,
  phone: String,
  address: String,
  location: [String],
  links: [String],
  internshipsPosted: [Schema.Types.ObjectId],
});

module.exports = mongoose.model("EmployerProfile", profileSchema);
