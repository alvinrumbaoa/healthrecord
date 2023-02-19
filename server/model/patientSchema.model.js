const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    }
  },
  phone: {
    type: String,
    required: true
  },
  emergencyContact: {
    name: {
      type: String,
      required: true
    },
    relationship: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  medicalHistory: {
    type: String,
  },
  allergies: [{
    type: String,
  }],
  medications: [{
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      required: true
    }
  }],
  visits: [{
    type: Schema.Types.ObjectId,
    ref: 'Visit'
  }],
  medicalDocuments: [
    {
    type: Schema.Types.ObjectId,
    ref: "Document"
    }
   ],
   createdAt: {
    type: Date,
    default: Date.now
    },
    appointments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }]
}, {timestamp: true} );

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
