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
mongoose.connect('mongodb://localhost:27017/newcon', { useNewUrlParser: true, useUnifiedTopology: true });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
// const Server = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




