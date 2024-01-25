 // models/models.js
 const mongoose = require('mongoose');
//  const con=require('./db');

 // User Schema
 const userSchema = new mongoose.Schema({
   username: {
     type: String,
     required: true,
   },
   email: {
     type: String,
     required: true,
     unique: true,
   },
   password: {
     type: String,
     required: true,
   },
 });

const User = mongoose.model('User', userSchema);

// const newUser = new User({
//   username: 'exampleUser',
//   email: 'example@email.com',
//   password: 'examplePassword',
// });

// newUser.save();

// Plan Schema
const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  planCode: {
    type: String,
    required: true, 
  }, //snake_case
  price: {
    type: Number,
    required: true,
  },
  validityDays: {
    type: Number,
    required: true,
  },
  dataLimit: {
    type: Number,
    required: true,
  },
  smsLimit: {
    type: Number,
    required: true,
  },
  talkTimeLimit: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
  },
});

const Plan = mongoose.model('Plan', planSchema);

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  activationDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { User, Plan, Transaction };
