// controllers/authController.js
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Replace 'your-secret-key' with your actual secret key
const secretKey = 'palakm';

// const sampleUser = {
//   id: 1,
//   username: 'exampleUser',
// };

router.get('/token', (req, res) => {
  // Create a JWT token with user information
  const token = jwt.sign({ user: sampleUser }, secretKey, { expiresIn: '1h' });

  // Send the token in the response
  res.json({ token });
});

module.exports = router;
