const mongoose = require("mongoose");


const AppointmentSchema = new mongoose.Schema({
	patient: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'Patient'
	},
	doctor: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'Doctor'
	},
	date: {
	  type: Date,
	  required: true
	},
	reason: {
	  type: String,
	  required: true
	},
	prescription: {
	  type: String,
	  required: true
	}
  });


  module.exports = mongoose.model("Appointment", AppointmentSchema);
  