const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoterSchema = new Schema({
  // special_id: {
  //   type: String,
  //   required: true,
  // },
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
    required: true,
  },
  username: {
    type: String,
  },
  // avatar: {
  //   type: String,
  // },

  // year: {
  //   type: String,
  //   required: true,
  // },

  // fatherName: {
  //   type: String,
  // },
  // aadharCard: {
  //   type: Number,
  // },
  // gender: {
  //   type: String,
  // },

  // profession: {
  //   type: String,
  //   required: true,
  // },

  // dob: {
  //   type: String,
  //   required: true,
  // },
  // VoterMobileNumber: {
  //   type: Number,
  // },
  otp: {
    type: String,
  },
  // candidate: {
  //   type: Schema.Types.ObjectId,
  //   ref: "candidate",
  // },
});

module.exports = mongoose.model("Voter", VoterSchema);
