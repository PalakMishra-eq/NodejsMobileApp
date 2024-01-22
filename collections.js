// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const { port } = require('./config/serverConfig');

const app = express();

app.use(bodyParser.json());

// Set up routes
app.use('/users', userRoutes);
app.use('/plans', planRoutes);
app.use('/transactions', transactionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
