const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    special_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    dob: {
      type: String,
    },
    joiningYear: {
      type: String,
    },
    contactNumber: {
      type: Number,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("client", clientSchema);
