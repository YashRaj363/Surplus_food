const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;
const path = require('path');


// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// MongoDB connection string
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/foodRoutes');

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
