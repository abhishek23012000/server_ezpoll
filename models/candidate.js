const mongoose = require("mongoose");
const { Schema } = mongoose;

const CandidateSchema = new Schema({
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

  avatar: {
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
  voter: {
    type: Schema.Types.ObjectId,
    ref: "voter",
  },
});

module.exports = mongoose.model("Candidate", CandidateSchema);
