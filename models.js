 // models/models.js
 const mongoose = require('mongoose');
//  const con=require('./db');
const ObjectId= mongoose.Types.ObjectId;

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
//   username: 'Palak',
//   email: 'palakm@email.com',
//   password: 'myPassword',
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

// const samplePlans = [
//   {
//     name: 'Basic Plan',
//     planCode: 'BASIC123',
//     price: 19.99,
//     validityDays: 30,
//     dataLimit: 2,
//     smsLimit: 100,
//     talkTimeLimit: 300,
//     details: 'Includes basic features.',
//   },
//   {
//     name: 'Premium Plan',
//     planCode: 'PREMIUM456',
//     price: 49.99,
//     validityDays: 60,
//     dataLimit: 10,
//     smsLimit: 500,
//     talkTimeLimit: 1000,
//     details: 'Includes premium features.',
//   },
//   // Add more plans as needed
// ];

// Plan.insertMany(samplePlans);

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

// (async () => {
//   const user = await User.findOne({ username: "Palak" });
//   const plan = await Plan.findOne({ name: "Basic Plan" });

//   const sampleTrans = [
//     {
//       userId: user._id,
//       planId: plan._id,
//       purchaseDate: new Date(),
//       activationDate: new Date('2024-06-24'), // Convert string to Date
//       expiryDate: new Date('2024-10-01'), // Convert string to Date
//     }
//   ];

//   Transaction.create(sampleTrans);
//   //iife asyn syntax
// })();


module.exports = { User, Plan, Transaction };





