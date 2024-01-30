// routes/planRoutes.js
const express = require('express');
const PlanController = require('./controler');
const authenticateUser = require('./middleware');
const User = require('./models'); // Import the User model

const authController = require('./authController');
app.use('/api/auth', authController);
const router = express.Router();

router.get('/', PlanController.landingPage);
router.get('/plans', PlanController.getAllPlans);
router.post('/purchase',  PlanController.purchasePlan);
router.get('/user/plans', PlanController.getUserPlans);
router.get('/expiring-plans', PlanController.getExpiringPlans);

module.exports = router;
