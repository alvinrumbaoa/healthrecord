const mongoose = require("mongoose");


const DoctorSchema = new mongoose.Schema({
	name: {
	  type: String,
	  required: true
	},
	specialty: {
	  type: String,
	  required: true
	},
	phone: {
	  type: String,
	  required: true
	},
	address: {
	  type: String,
	  required: true
	},
	appointments: [{
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'Appointment'
	}]
  });

module.exports = mongoose.model("Doctor", DoctorSchema);

  