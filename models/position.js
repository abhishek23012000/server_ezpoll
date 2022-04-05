const mongoose = require("mongoose");
const { Schema } = mongoose;

const PositionSchema = new Schema({
  position_id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // voter: {
  //   type: Schema.Types.ObjectId,
  //   ref: "voter",
  // },

  voter: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("Position", PositionSchema);
