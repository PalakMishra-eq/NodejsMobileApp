// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  // Get the token from the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  // Verify the token
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Attach user information to the request object
    req.user = decoded.user;
    next();
  });
}

module.exports = authenticateUser;
