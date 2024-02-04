// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const {user}= require(./'models');

async function authenticateUser(req, res, next) {
  // Get the token from the Authorization header
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Missing or invalid token format' });
  }

  const token = authorizationHeader.split(' ')[1];

  // Verify the token
  jwt.verify(token, 'palakm', (err, decoded) => {
    if (err) {
      // Handle specific errors (e.g., TokenExpiredError, JsonWebTokenError)
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Attach user information to the request object
    req.user = decoded.user;
    next();
  });
}

module.exports = authenticateUser;
