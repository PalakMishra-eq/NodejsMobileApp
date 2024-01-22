// models/planModel.js
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  validityDays: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
  },
  // Additional fields for plan details, if needed
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
