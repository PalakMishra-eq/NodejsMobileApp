// controllers/planController.js
const model = require('./models');
//console.log(model);

function landingPage(req, res){
    const name = req.query.name;
    res.send(name);

}

function getAllPlans(req, res) {
  try {
    const plans =  model.Plan.find();
    // console.log(plans);
    res.send(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function purchasePlan(req, res) {
  try {
    // Assuming plan details are present in req.body
    const newPlan =  model.Transaction.create();
    res.status(201).send(newPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

 function getUserPlans(req, res) {
  try {
    // Assuming user information is available in req.user
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const userPlans =  model.Transaction.find({userId: req.params.userId, // Assuming userId is part of the request parameters
    expiryDate: { $gt: today },});
    res.json(userPlans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

 function getExpiringPlans(req, res) {
  try {
    // Assuming user information is available in req.user
    const expiringPlans =  model.Transaction.find({
      userId: req.user._id,
      expiryDate: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    });
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

