const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/events');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
 
});

// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Import routes
app.use('/events', eventRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));