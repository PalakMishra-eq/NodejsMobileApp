// routes/planRoutes.js
const express = require('express');
const PlanController = require('./controler');
const authenticateUser = require('./middleware');


const router = express.Router();

router.get('/', PlanController.landingPage);
router.get('/plans', authenticateUser, PlanController.getAllPlans);
router.post('/purchase', authenticateUser, PlanController.purchasePlan);
router.get('/user/plans', authenticateUser, PlanController.getUserPlans);
router.get('/expiring-plans', authenticateUser, PlanController.getExpiringPlans);

module.exports = router;
