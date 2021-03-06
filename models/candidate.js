const mongoose = require("mongoose");
const { Schema } = mongoose;

const CandidateSchema = new Schema({
  // special_id: {
  //   type: String,
  //   required: true,
  // },

  position_id: {
    type: String,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "client",
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

  profile: {
    type: String,
  },
  partyName: {
    type: String,
  },
  phone: {
    type: Number,
  },
  vote: {
    type: Number,
    default: 0,
  },
  // voter: {
  //   type: Schema.Types.ObjectId,
  //   ref: "voter",
  // },
});

module.exports = mongoose.model("Candidate", CandidateSchema);
