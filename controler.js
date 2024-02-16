// controllers/planController.js
const {User, Plan, Transaction}= require('./models');
//console.log(model);

const cron = require('node-cron');
const sendEmail = require('./emailService.js');
const middleware=require('./middleware');

const jwt = require('jsonwebtoken');
const config = require('./config');







function landingPage(req, res){
    const name = req.query.name;
    res.send("Welcome to Jio Teelecom Service");

}

//======================================================================================================

const getAllPlans = async (req, res)=> {

  
  const plans = await Plan.find({}, '-__v').lean(); //.select('name')
   
    res.send(plans);
}



//=====================================================================================================




async function purchasePlan(req, res) {
   try {
    const today = new Date();
    console.log('Request Body:', req.body);

    const userId = req.body.userId;
    console.log('UserId:', userId);
    const planId = req.body.planId;
    console.log('PlanId:', planId);

    // Assuming you have a document with a specific _id
    const planInstance = await Plan.findById(planId);
    console.log('Plan Instance:', planInstance);
    
    if (!planInstance) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Find the user's last plan from the transaction table
    const lastPlan = await Transaction.findOne(
      { userId },
      {},
      { sort: { purchaseDate: -1 } } // Sort in descending order to get the latest plan
    );
    console.log('Last Plan:', lastPlan);

    const activationDate = lastPlan ? lastPlan.expiryDate : today; //if lastplan exists otherwise today is activation date!
    console.log('Activation Date:', activationDate);
    const expiryDate = new Date(activationDate.getTime() + planInstance.validityDays * 24 * 60 * 60 * 1000);
    console.log('Expiry Date:', expiryDate);

    const newPlan = await Transaction.create({
      userId,
      planId,
      purchaseDate: today,
      activationDate,
      expiryDate,
    });

    res.status(201).json(newPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'My stupid Internal Server Error' });
  }
}


//=========================================================================================================




 async function getUserPlans(req, res) {
  try {
    
  // Extract user ID and email from the decoded payload
  const userid = req.userId;

    // Fetch active plans (expiryDate > today)
    const activePlans = await Transaction.find({userId:userid, activationDate: {$lte : new Date()},
      expiryDate: { $gt: new Date() },
    },'-__v').lean();

    // Fetch expired plans (expiryDate <= today)
    const expiredPlans = await Transaction.find({userId: userid,
      expiryDate: { $lte: new Date() },
    },'-__v').lean();

    // Fetch plans whose activation date is greater than today
    const futureActivationPlans = await Transaction.find({userId: userid,
      activationDate: { $gt: new Date() },
    },'-__v').lean();

    res.json({
      activePlans,
      expiredPlans,
      futureActivationPlans,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



//==============================================================================================================




 async function getExpiringPlans(req, res) {
  try {
    const userid = req.userId;
    // Schedule cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    // Fetch all expiring plans within the next seven days
    const expiringPlans = await Transaction.find({
      expiryDate: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    }).populate('userId').populate('planId');

    // Iterate through each expiring plan
    expiringPlans.forEach(async (plan) => {
      const millisecondsInADay = 24 * 60 * 60 * 1000;
      const daysLeft = Math.ceil((plan.expiryDate - Date.now()) / millisecondsInADay);

      // Trigger email if days left is within the next seven days
      if (daysLeft >= 0 && daysLeft <= 7) {
        const emailContent = `Hello ${userDetails.username}, your plan is expiring in ${daysLeft} days.`;
        await sendEmail(req.body.email, 'Plan Expiry Reminder', emailContent);
      }
    });
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

    const expiringPlans = await Transaction.find({userId:userid,
      expiryDate: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
     });

     const plansWithDaysLeft = expiringPlans.map(plan => {
      const millisecondsInADay = 24 * 60 * 60 * 1000;
      const daysLeft = Math.ceil((plan.expiryDate - Date.now()) / millisecondsInADay);
      return { 
        ...plan._doc, 
        daysLeft,
        userDetails: {
          username: plan.userId.username,
          email: plan.userId.email
        }
      }; // Adds daysLeft to each plan
    });

    res.json(plansWithDaysLeft);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  landingPage,  
  getAllPlans,
  purchasePlan,
  getUserPlans,
  getExpiringPlans,
};

