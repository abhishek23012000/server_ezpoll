const mongoose = require("mongoose");
const { Schema } = mongoose;
const pollSchema = new Schema(
  {
    poll_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    // choice1: {
    //   type: String,
    // },
    // choice2: {
    //   type: String,
    // },
    // choice3: {
    //   type: String,
    // },

    // choice1Vote: {
    //   type: Number,
    //   default: 0,
    // },
    // choice2Vote: {
    //   type: Number,
    //   default: 0,
    // },
    // choice3Vote: {
    //   type: Number,
    //   default: 0,
    // },

    choices: [
      {
        choiceNo: String,
        choiceValue: String,
      },
    ],

    exp: {
      type: Date,
    },

    mac: [
      {
        type: String,
      },
    ],
    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
    },
  },
  { strict: false }
);

module.exports = mongoose.model("poll", pollSchema);
