const mongoose = require("mongoose");
const { Schema } = mongoose;

const PositionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("Position", PositionSchema);
