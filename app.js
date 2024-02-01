// Import required modules
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//connection
const MONGODB_URI = 'mongodb://localhost:27017/mycon';

mongoose.connect(MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
//connection

// Initialize Express app
const app = express();
const Port = process.env.PORT || 3000;

const route=require('./routes');
app.use(route);

const authController = require('./authController');
app.use('/api/auth', authController);
// Middleware for parsing JSON requests
app.use(bodyParser.json());


// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal middleware Server Error' });
// });

// Start the server
// const Server = 3000;
app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});




