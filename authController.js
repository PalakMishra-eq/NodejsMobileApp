// controllers/authController.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('./models');
const router = express.Router();

// Replace 'your-secret-key' with your actual secret key
const secretKey = 'palakm';

//new controller
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token with user information
    const token = jwt.sign({ user: { id: user._id, email: user.email } }, secretKey, { expiresIn: '1h' });

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

//
// router.get('/token', (req, res) => {
//   // Create a JWT token with user information
//   const token = jwt.sign({ user: sampleUser }, secretKey, { expiresIn: '1h' });

//   // Send the token in the response
//   res.json({ token });
// });

// module.exports = router;
