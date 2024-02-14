// Import required modules
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');


//connection
const db=require('./db');
//connection

// Initialize Express app
const app = express();
const Port = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

const route=require('./routes');
app.use(route);

const authController = require('./authController');
app.use('/api/auth', authController);

// const authenticateUser = require('./middleware');
// app.use(authenticateUser);


// Start the server
// const Server = 3000;
app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});




