// controllers/planController.js
const Plan = require('./models').Plan;

function getAllPlans(req, res) {
  try {
    const plans =  Plan.find();
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function purchasePlan(req, res) {
  try {
    // Assuming plan details are present in req.body
    const newPlan =  Plan.create(req.body);
    res.status(201).json(newPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

 function getUserPlans(req, res) {
  try {
    // Assuming user information is available in req.user
    const userPlans =  Plan.find({ userId: req.user._id });
    res.json(userPlans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

 function getExpiringPlans(req, res) {
  try {
    // Assuming user information is available in req.user
    const expiringPlans =  Plan.find({
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
  getAllPlans,
  purchasePlan,
  getUserPlans,
  getExpiringPlans,
};

