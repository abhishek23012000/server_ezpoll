const mongoose = require("mongoose");
const { Schema } = mongoose;
const pollSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    choice1: {
      type: String,
    },
    choice2: {
      type: String,
    },
    choice3: {
      type: String,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("poll", pollSchema);
