// Import required modules
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

//connect to database()

// Authentication middleware
function authenticateUser(req, res, next) {
  // Implement your authentication logic here
  // Verify the JWT token, check user credentials, etc.
  // Example: Verify JWT token from the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = decoded.user; // Attach user information to the request object
    next();
  });
}

// Define routes

// Provide a list of plans available for purchase
app.get('/plans', authenticateUser, (req, res) => {
  // Implement logic to fetch and return available plans
  // Use req.user to get user information if needed
    res.json({ message: 'List of plans available for purchase' });
  });

  // Allows users to purchase a new plan using plan code
  app.post('/purchase', authenticateUser, (req, res) => {
    try {
      // Extract plan code from the request body
      const { planCode } = req.body;

      // Fetch plan details based on the plan code (Assuming you have a plans collection)
      const planDetails = db.collection('plans').findOne({ code: planCode });

      if (!planDetails) {
        return res.status(404).json({ error: 'Plan not found' });
      }

      // Create a new user plan entry in the userPlans collection
       db.collection('userPlans').insertOne({
        userId: req.user.userId,
        planCode: planDetails.code,
        planName: planDetails.name,
        purchaseDate: new Date(),
        expiryDate: calculateExpiryDate(planDetails.validityDays),
      });

      res.json({ message: 'Plan purchased successfully' });
    } catch (error) {
      console.error('Error handling plan purchase:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
   

// Retrieves a list of all plans associated with the user
app.get('/user/plans', authenticateUser, (req, res) => {
  try {
    // Fetch user plans based on user ID
    const userPlans = db.collection('userPlans').find({ userId: req.user.userId }).toArray();

    res.json({ message: 'List of user plans', userPlans });
  } catch (error) {
    console.error('Error fetching user plans:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Returns a list of plans that are set to expire in the next 7 days
app.get('/expiring-plans', authenticateUser, (req, res) => {
  try {
    // Fetch user plans that are set to expire in the next 7 days
    const currentDate = new Date();
    const expirationDateThreshold = new Date();
    expirationDateThreshold.setDate(currentDate.getDate() + 7);

    const userPlans = db.collection('userPlans').find({
      userId: req.user.userId,  // Assuming there's a userId field in the user object
      expirationDate: { $lte: expirationDateThreshold },
    }).toArray();

    res.json({ message: 'List of expiring plans in the next 7 days', userPlans });
  } catch (error) {
    console.error('Error fetching expiring plans:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const app = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




