// routes/planRoutes.js
const express = require('express');
const PlanController = require('./controler');
const authenticateUser = require('./middleware');
const User = require('./models'); // Import the User model


const router = express.Router();

router.get('/plans', authenticateUser, PlanController.getAllPlans);
router.post('/purchase', authenticateUser, PlanController.purchasePlan);
router.get('/user/plans', authenticateUser, PlanController.getUserPlans);
router.get('/expiring-plans', authenticateUser, PlanController.getExpiringPlans);

module.exports = router;
