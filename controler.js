// controllers/planController.js
const {User, Plan, Transaction}= require('./models');
//console.log(model);

function landingPage(req, res){
    const name = req.query.name;
    res.send(name);

}

const getAllPlans = async (req, res)=> {

  
  const plans = await Plan.find({}, '-__v').lean(); //.select('name')
    //console.log(plans);
    //const planNames=plans.map(plan => plan.name);
    //console.log(planNames);
    // const planData = plans.map(plan => ({
    //   name: plan.name,
    //   planCode: plan.planCode,
    //   price: plan.price,
    //   validityDays: plan.validityDays,
    //   dataLimit: plan.dataLimit,
    //   smsLimit: plan.smsLimit,
    //   talkTimeLimit: plan.talkTimeLimit,
    //   details: plan.details,
    // }));
    res.send(planData);
}

// async function purchasePlan(req, res) {
//   try {
//     // Assuming plan details are present in req.body
//     const today = new Date();

//     // Assuming you have a document with a specific _id
//     const planInstance =await Plan.findById();
//     // Accessing the validityDays property
//     const pvalidity = planInstance.validityDays;
//     const exp=Transaction.findOne({
//       expiryDate: { $gt: today },
//       purchaseDate: { $lt: today }
//     });
//     const activationDate= exp.expiryDate;
//     const expDate = activationDate+pvalidity ;
//     const userId=req.query.userId;
//     const planId=req.query.planId;

//     const newPlan =  Transaction.create(userId, planId, today,activationDate, expDate  );
//     res.status(201).send(newPlan);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

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

    const activationDate = lastPlan ? lastPlan.expiryDate : today;
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

 async function getUserPlans(req, res) {
  try {
    // Assuming user information is available in req.user
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);
    // const userPlans = await Transaction.find({userId: req.params.userId, // Assuming userId is part of the request parameters
    // expiryDate: { $gt: today },});

    // res.json(userPlans);

    // Fetch active plans (expiryDate > today)
    const activePlans = await Transaction.find({
      expiryDate: { $gt: new Date() },
    });

    // Fetch expired plans (expiryDate <= today)
    const expiredPlans = await Transaction.find({
      expiryDate: { $lte: new Date() },
    });

    // Fetch plans whose activation date is greater than today
    const futureActivationPlans = await Transaction.find({
      activationDate: { $gt: new Date() },
    });

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

 async function getExpiringPlans(req, res) {
  try {
    // Assuming user information is available in req.user
    const expiringPlans = await Transaction.find({
      expiryDate: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    });//also return days left.
    res.json(expiringPlans);
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

