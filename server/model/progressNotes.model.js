const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgressNotesSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  subjective: {
    type: String,
    required: true
  },
  objective: {
    type: String,
    required: true
  },
  assessment: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("ProgressNotesSchema", ProgressNotesSchema);
